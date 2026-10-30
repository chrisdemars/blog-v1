import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { eventsLoader } from './lib/sessionizeLoader';

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

// YYYY-MM-DD, or YYYY-MM when only the month is known.
const eventDate = z
  .union([z.string(), z.date()])
  .transform((value) =>
    value instanceof Date ? value.toISOString().slice(0, 10) : value,
  )
  .pipe(
    z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/, 'use YYYY-MM-DD or YYYY-MM'),
  );

const events = defineCollection({
  loader: eventsLoader(),
  schema: z
    .object({
      name: z.string(),
      url: z.url().optional(),
      location: z.string().optional(),
      virtual: z.boolean().default(false),
      start: eventDate,
      end: eventDate.optional(),
      // Slug of the talk given there, from /talks.
      talk: z.string().optional(),
      source: z.enum(['sessionize', 'manual']),
    })
    .refine(({ start, end }) => !end || end >= start, {
      message: 'end must not be before start',
    }),
});

export const collections = { blog, events };
