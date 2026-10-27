# blog-v1

Personal site and blog for Chris DeMars, Senior Developer Advocate. Built with [Astro](https://astro.build) and Tailwind CSS, deployed on Netlify.

## Commands

| Command                | Action                                   |
| :--------------------- | :--------------------------------------- |
| `npm install`          | Install dependencies                     |
| `npm run dev`          | Start the dev server at `localhost:4321` |
| `npm run build`        | Build the production site to `./dist/`   |
| `npm run preview`      | Preview the build locally                |
| `npm run check`        | Type-check `.astro` and `.ts` files      |
| `npm run format`       | Format with Prettier                     |
| `npm run format:check` | Verify formatting (runs in CI)           |

## Environment

- `URL`: production URL used for canonical links, sitemap and robots.txt. Netlify sets it automatically; locally it falls back to `http://localhost:4321`.
- `GITHUB_TOKEN` (optional): raises the GitHub API rate limit for the conference talks loader.

## Writing a blog post

Add a Markdown file to `src/content/blog/`. The file name becomes the URL, so `my-new-post.md` is published at `/blog/my-new-post/`.

```md
---
title: 'My New Post'
description: 'One or two sentences. Shown on the blog index, in search results, and in RSS.'
pubDate: 2026-11-01
# Optional:
updatedDate: 2026-11-15
heroImage: '../../assets/blog/my-new-post.jpg'
heroAlt: 'What the image shows. Leave out if it is decorative.'
badge: 'New'
tags: ['supply chain', 'npm']
draft: true # Shows in `npm run dev`, left out of production builds.
---

Write the post here.

![Describe the image](../../assets/blog/my-new-post/screenshot.png)
```

- Put images in `src/assets/blog/` and reference them with a relative path so they're optimized at build time.
- Tags are grouped case-insensitively (`GitHub` and `github` are one tag) and each gets a page at `/blog/tag/<tag>/`.
- The build fails if frontmatter is missing a required field or points at an image that doesn't exist.
