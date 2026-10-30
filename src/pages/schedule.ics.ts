import type { APIRoute } from 'astro';
import { getSchedule } from '../lib/events';
import { icsResponse, toIcs } from '../lib/ics';
import { SITE } from '../config';

// Subscribable feed of upcoming events that have exact dates.
export const GET: APIRoute = async ({ site }) => {
  const { upcoming } = await getSchedule();
  return icsResponse(toIcs(upcoming, site!, `${SITE.name}: Speaking`));
};
