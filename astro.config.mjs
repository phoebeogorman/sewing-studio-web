// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// TODO: replace with the real domain once it is decided. Canonical URLs, the
// hreflang alternates and the Open Graph tags are all derived from this value.
export default defineConfig({
  site: 'https://thesewingstudio.example',
  vite: {
    plugins: [tailwindcss()]
  }
});
