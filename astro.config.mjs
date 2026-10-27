// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { codeTheme } from './src/styles/code-theme.ts';

// Netlify sets `URL` to the production URL on every build, including deploy
// previews, so canonical links always point at the live site.
const site = process.env.URL ?? 'http://localhost:4321';

// Built and deployed, but kept out of the sitemap. These pages also set
// `noindex` in their layout.
const hiddenPages = ['/design-system/'];

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !hiddenPages.some((path) => new URL(page).pathname === path),
    }),
  ],
  markdown: {
    shikiConfig: { theme: codeTheme },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
