import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://boardtrainingprinciples.org',
  output: 'static',
  integrations: [mdx()],
});
