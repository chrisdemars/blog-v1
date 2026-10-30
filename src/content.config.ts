import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { talksLoader } from './lib/talksLoader';
import { SPEAKING_TOPICS } from './config';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      // Leave empty when the image is decorative.
      heroAlt: z.string().default(''),
      badge: z.string().optional(),
      tags: z
        .array(z.string())
        .refine((tags) => new Set(tags).size === tags.length, {
          message: 'tags must be unique',
        })
        .default([]),
      // Drafts render in `astro dev` but are left out of production builds.
      draft: z.boolean().default(false),
    }),
});

const topicIds = SPEAKING_TOPICS.map(({ id }) => id) as [string, ...string[]];

const talks = defineCollection({
  loader: talksLoader(),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    // Path in the conference-proposals repo, and its GitHub URL.
    file: z.string(),
    url: z.url(),
    featured: z.boolean().default(false),
    topics: z.array(z.enum(topicIds)).min(1),
  }),
});

export const collections = { blog, talks };
