import ViteYaml from '@modyfi/vite-plugin-yaml';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [ViteYaml(), sveltekit()],

	resolve: {
		extensions: ['.js', '.ts', '.svelte', '.yaml']
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
