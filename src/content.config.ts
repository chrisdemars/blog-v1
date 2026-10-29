import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
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

// YYYY-MM, as written in experience.yaml (YAML would read 2024-02 as a string).
const yearMonth = z
  .union([z.string(), z.date()])
  .transform((value) =>
    value instanceof Date ? value.toISOString().slice(0, 7) : value,
  )
  .pipe(z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'use YYYY-MM'));

const experience = defineCollection({
  loader: file('src/data/experience.yaml'),
  schema: z
    .object({
      title: z.string(),
      company: z.string(),
      location: z.string().optional(),
      start: yearMonth,
      // Leave out for a current role.
      end: yearMonth.optional(),
      highlights: z.array(z.string()).default([]),
    })
    .refine(({ start, end }) => !end || end >= start, {
      message: 'end must not be before start',
    }),
});

export const collections = { blog, experience };
