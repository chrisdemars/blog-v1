import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      badge: z.string().optional(),
      tags: z
        .array(z.string())
        .refine((tags) => new Set(tags).size === tags.length, {
          message: 'tags must be unique',
        })
        .default([]),
    }),
});

export const collections = { blog };
