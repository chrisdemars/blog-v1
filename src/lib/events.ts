import { getCollection, type CollectionEntry } from 'astro:content';

export type SpeakingEvent = CollectionEntry<'events'>;

// Sessionize often only gives the month; exact dates are YYYY-MM-DD.
export const hasExactDates = ({ data }: SpeakingEvent) =>
  data.start.length === 10;

/**
 * Still upcoming (or happening) as of `today`. Month-only dates count as
 * upcoming until that month is over. Pages are built statically, so this is
 * as of the last build; the scheduled rebuild keeps it current.
 */
export function isUpcoming({ data }: SpeakingEvent, today = new Date()) {
  const last = data.end ?? data.start;
  return last >= today.toISOString().slice(0, last.length);
}

const toDate = (value: string) => new Date(`${value}T00:00:00Z`);
const dayFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});
const monthFormat = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "Jan 14–16, 2027", or "January 2027" when only the month is known. */
export function formatEventDates(event: SpeakingEvent) {
  const { start, end } = event.data;
  if (!hasExactDates(event)) return monthFormat.format(toDate(`${start}-01`));
  return end && end !== start
    ? dayFormat.formatRange(toDate(start), toDate(end))
    : dayFormat.format(toDate(start));
}

/** Upcoming events soonest first, past events most recent first. */
export async function getSchedule(today = new Date()) {
  const events = await getCollection('events');
  const byStart = (a: SpeakingEvent, b: SpeakingEvent) =>
    a.data.start.localeCompare(b.data.start);
  return {
    upcoming: events.filter((e) => isUpcoming(e, today)).sort(byStart),
    past: events
      .filter((e) => !isUpcoming(e, today))
      .sort((a, b) => byStart(b, a)),
  };
}
