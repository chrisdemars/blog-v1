import { getCollection, type CollectionEntry } from 'astro:content';
import { SPEAKING_TOPICS } from '../config';

export type Talk = CollectionEntry<'talks'>;

const topicTitle = new Map<string, string>(
  SPEAKING_TOPICS.map(({ id, title }) => [id, title]),
);
export const getTopicTitle = (id: string) => topicTitle.get(id) ?? id;

/**
 * Talks grouped by their first topic, in SPEAKING_TOPICS order (supply chain
 * first). Featured talks lead each group, then alphabetical.
 */
export async function getTalksByTopic() {
  const talks = await getCollection('talks');
  return SPEAKING_TOPICS.map(({ id, title, description }) => ({
    id,
    title,
    description,
    talks: talks
      .filter((talk) => talk.data.topics[0] === id)
      .sort(
        (a, b) =>
          Number(b.data.featured) - Number(a.data.featured) ||
          a.data.title.localeCompare(b.data.title),
      ),
  })).filter((group) => group.talks.length > 0);
}

// Meta descriptions get cut off around 160 characters in search results.
export const toMetaDescription = (text: string, max = 160) =>
  text.length <= max
    ? text
    : `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
