import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE } from '../config';
import { getPosts } from '../lib/blog';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  return rss({
    title: `${SITE.name}: Blog`,
    description: SITE.description,
    site: site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: `<language>${SITE.locale}</language>`,
  });
};
