// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

const site =
	process.env.PUBLIC_SITE_URL ?? 'https://fogoneria-landing.vercel.app';

// https://astro.build/config
export default defineConfig({
	site,
	adapter: vercel(),
	vite: {
		plugins: [tailwindcss()],
	},
});
