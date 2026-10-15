import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://molindamihiranga17.github.io',
  base: process.env.SITE_BASE || '/',
  output: 'static',
});
