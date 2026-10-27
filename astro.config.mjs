// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Netlify sets `URL` to the production URL on every build, including deploy
// previews, so canonical links always point at the live site.
const site = process.env.URL ?? 'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
