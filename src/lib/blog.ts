import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export const POSTS_PER_PAGE = 10;

// Newest first. Drafts show in `astro dev` but never in a production build.
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection(
    'blog',
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function readingMinutes(post: Post): number {
  const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Dates are written as YYYY-MM-DD and parsed as UTC midnight, so format in
// UTC to avoid showing the previous day in US time zones.
const dateFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeZone: 'UTC',
});
export const formatDate = (date: Date) => dateFormat.format(date);

export function tagSlug(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

export interface Tag {
  slug: string;
  label: string;
  posts: Post[];
}

// Groups by slug, so "GitHub" and "github" are one tag. The first label seen
// (from the newest post) is the one shown.
export function getTags(posts: Post[]): Tag[] {
  const tags = new Map<string, Tag>();
  for (const post of posts) {
    for (const label of post.data.tags) {
      const slug = tagSlug(label);
      const tag = tags.get(slug) ?? { slug, label, posts: [] };
      tag.posts.push(post);
      tags.set(slug, tag);
    }
  }
  return [...tags.values()].sort((a, b) => b.posts.length - a.posts.length);
}

// Posts sharing the most tags, newest first on ties.
export function getRelatedPosts(post: Post, posts: Post[], limit = 3): Post[] {
  const tags = new Set(post.data.tags.map(tagSlug));
  return posts
    .filter((other) => other.id !== post.id)
    .map((other) => ({
      other,
      shared: other.data.tags.filter((tag) => tags.has(tagSlug(tag))).length,
    }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map(({ other }) => other);
}
