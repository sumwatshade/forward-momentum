import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		screens: {
			img: '225px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px'
		},
		borderWidth: {
			default: '1px',
			0: '0',
			2: '2px',
			4: '4px'
		},
		extend: {
			colors: {
				republican: '#B22234',
				democrat: '#3C3B6E',
				libertarian: '#B07600',
				independent: '#800080'
			}
		}
	},
	variants: {},
	plugins: [],

	plugins: [typography]
} satisfies Config;
