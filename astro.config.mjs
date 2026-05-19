import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://powderblue-bat-208812.hostingersite.com',
  output: 'static',
  integrations: [mdx()],
});
