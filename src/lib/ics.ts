import { SITE } from '../config';
import { hasExactDates, type SpeakingEvent } from './events';

// iCalendar (RFC 5545) for events with exact dates, as all-day events.

const escape = (text: string) =>
  text.replace(/[\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');

// Lines longer than 75 octets continue on the next line after a space.
function fold(line: string) {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const parts: string[] = [];
  let current = '';
  for (const char of line) {
    const limit = parts.length === 0 ? 75 : 74;
    if (new TextEncoder().encode(current + char).length > limit) {
      parts.push(current);
      current = '';
    }
    current += char;
  }
  parts.push(current);
  return parts.join('\r\n ');
}

const icsDate = (value: string) => value.replaceAll('-', '');

// DTEND is exclusive for all-day events: the day after the last day.
function dayAfter(value: string) {
  const date = new Date(`${value}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

export function toIcs(events: SpeakingEvent[], site: URL, name: string) {
  const stamp = new Date().toISOString().replace(/[-:]|\.\d+/g, '');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${site.host}//Speaking schedule//EN`,
    'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:${escape(name)}`,
  ];
  for (const event of events.filter(hasExactDates)) {
    const { data } = event;
    lines.push(
      'BEGIN:VEVENT',
      `UID:${event.id}@${site.host}`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDate(data.start)}`,
      `DTEND;VALUE=DATE:${icsDate(dayAfter(data.end ?? data.start))}`,
      `SUMMARY:${escape(`${SITE.name} speaking at ${data.name}`)}`,
    );
    const location = data.virtual ? 'Virtual' : data.location;
    if (location) lines.push(`LOCATION:${escape(location)}`);
    if (data.url) lines.push(`URL:${data.url}`);
    lines.push(
      `DESCRIPTION:${escape(`Details: ${new URL('/schedule/', site)}`)}`,
      'END:VEVENT',
    );
  }
  lines.push('END:VCALENDAR');
  return lines.map(fold).join('\r\n') + '\r\n';
}

export const icsResponse = (body: string) =>
  new Response(body, {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
