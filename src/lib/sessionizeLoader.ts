import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import type { Loader, LoaderContext } from 'astro/loaders';
import { parse } from 'yaml';
import { SOCIALS } from '../config';

const OVERRIDES = 'src/data/events.yaml';

const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

export interface EventDates {
  // YYYY-MM-DD, or YYYY-MM when Sessionize only gives the month.
  start: string;
  end?: string;
}

const pad = (n: number | string) => String(n).padStart(2, '0');

function monthNumber(name: string) {
  const index = MONTHS.indexOf(name.slice(0, 3).toLowerCase());
  if (index === -1) throw new Error(`unknown month "${name}"`);
  return pad(index + 1);
}

const day = (d: string, month: string, year: string) =>
  `${year}-${monthNumber(month)}-${pad(d)}`;

/**
 * Parses Sessionize's date text: "January 2027", "14 Jan 2027",
 * "14 - 16 Jan 2027", "28 Feb - 2 Mar 2027", "30 Dec 2026 - 2 Jan 2027".
 */
export function parseSessionizeDate(text: string): EventDates | null {
  const t = text.replace(/\s+/g, ' ').trim();
  let m: RegExpExecArray | null;
  if ((m = /^([A-Za-z]+) (\d{4})$/.exec(t))) {
    return { start: `${m[2]}-${monthNumber(m[1])}` };
  }
  if ((m = /^(\d{1,2}) ([A-Za-z]+) (\d{4})$/.exec(t))) {
    return { start: day(m[1], m[2], m[3]) };
  }
  if ((m = /^(\d{1,2}) ?- ?(\d{1,2}) ([A-Za-z]+) (\d{4})$/.exec(t))) {
    return { start: day(m[1], m[3], m[4]), end: day(m[2], m[3], m[4]) };
  }
  if (
    (m = /^(\d{1,2}) ([A-Za-z]+) ?- ?(\d{1,2}) ([A-Za-z]+) (\d{4})$/.exec(t))
  ) {
    return { start: day(m[1], m[2], m[5]), end: day(m[3], m[4], m[5]) };
  }
  if (
    (m =
      /^(\d{1,2}) ([A-Za-z]+) (\d{4}) ?- ?(\d{1,2}) ([A-Za-z]+) (\d{4})$/.exec(
        t,
      ))
  ) {
    return { start: day(m[1], m[2], m[3]), end: day(m[4], m[5], m[6]) };
  }
  return null;
}

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const decode = (text: string) =>
  text
    .replace(/<[^>]+>/g, '')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();

interface RawEvent extends Partial<EventDates> {
  id: string;
  name?: string;
  url?: string;
  location?: string;
  virtual?: boolean;
  talk?: string;
  hidden?: boolean;
  source?: 'sessionize' | 'manual';
}

/** Events from the Events section of the public Sessionize profile. */
async function fetchSessionizeEvents(
  logger: LoaderContext['logger'],
): Promise<RawEvent[]> {
  const res = await fetch(SOCIALS.sessionize, {
    headers: { 'User-Agent': 'chrisdemars.com build' },
  });
  if (!res.ok) throw new Error(`Sessionize responded with ${res.status}`);
  const html = await res.text();

  const events: RawEvent[] = [];
  for (const [, block] of html.matchAll(
    /<div class="c-s-event">([\s\S]*?)<\/div>/g,
  )) {
    const name = /class="c-s-event__name"[^>]*>([\s\S]*?)<\/(?:a|span)>/.exec(
      block,
    );
    const date = /c-s-event__meta--date">([\s\S]*?)<\/span>/.exec(block);
    if (!name || !date) continue;

    const eventName = decode(name[1]);
    const dates = parseSessionizeDate(decode(date[1]));
    if (!dates) {
      logger.warn(
        `Skipping "${eventName}": can't read date "${decode(date[1])}"`,
      );
      continue;
    }
    const url = /class="c-s-event__name" href="([^"]+)"/.exec(block);
    const location = /c-s-event__meta--location">([\s\S]*?)<\/span>/.exec(
      block,
    );
    events.push({
      id: slugify(eventName),
      name: eventName,
      url: url ? decode(url[1]) : undefined,
      location: location ? decode(location[1]) : undefined,
      source: 'sessionize',
      ...dates,
    });
  }
  return events;
}

/**
 * Confirmed speaking events: the public Sessionize profile (which only lists
 * accepted events), merged with src/data/events.yaml by id. If Sessionize is
 * unreachable, the previously loaded events are kept (in dev) and the YAML
 * events still load, so the build never fails.
 */
export function eventsLoader(): Loader {
  return {
    name: 'events-loader',
    load: async ({ store, logger, parseData, generateDigest, config }) => {
      const overrides: RawEvent[] =
        parse(
          await readFile(
            fileURLToPath(new URL(OVERRIDES, config.root)),
            'utf8',
          ),
        ) ?? [];

      let sessionize: RawEvent[] | null = null;
      try {
        sessionize = await fetchSessionizeEvents(logger);
      } catch (err) {
        logger.warn(`Could not load events from Sessionize: ${err}`);
      }

      const merged = new Map<string, RawEvent>();
      if (sessionize) {
        for (const event of sessionize) merged.set(event.id, event);
      } else {
        // Keep whatever Sessionize gave us last time.
        for (const entry of store.values()) {
          if (entry.data.source === 'sessionize') {
            merged.set(entry.id, {
              ...(entry.data as unknown as RawEvent),
              id: entry.id,
            });
          }
        }
      }
      for (const override of overrides) {
        // The id becomes a URL (/schedule/<id>.ics), so keep it kebab-case.
        if (override.id !== slugify(override.id)) {
          throw new Error(
            `${OVERRIDES}: id "${override.id}" must be kebab-case, e.g. "${slugify(override.id)}"`,
          );
        }
        const existing = merged.get(override.id);
        merged.set(override.id, {
          source: 'manual',
          ...existing,
          ...override,
        });
      }

      store.clear();
      for (const event of merged.values()) {
        if (event.hidden) continue;
        const { hidden, ...fields } = event;
        const data = await parseData({ id: event.id, data: fields });
        store.set({ id: event.id, data, digest: generateDigest(data) });
      }
    },
  };
}
