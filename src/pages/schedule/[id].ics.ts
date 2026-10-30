import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { hasExactDates, type SpeakingEvent } from '../../lib/events';
import { icsResponse, toIcs } from '../../lib/ics';

// One "Add to calendar" file per event with exact dates.
export const getStaticPaths = (async () => {
  const events = (await getCollection('events')).filter(hasExactDates);
  return events.map((event) => ({
    params: { id: event.id },
    props: { event },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) => {
  const { event } = props as { event: SpeakingEvent };
  return icsResponse(toIcs([event], site!, event.data.name));
};
