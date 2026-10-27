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
