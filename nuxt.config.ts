import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
	ssr: true,
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	srcDir: 'src',
	css: ['~/assets/css/main.css'],
	vite: {
		plugins: [tailwindcss()]
	},
	nitro: {
		preset: 'static',
		prerender: {
			crawlLinks: true,
			routes: ['/', '/sitemap.xml']
		}
	},
	modules: [
		'@nuxtjs/sitemap',
		'@nuxtjs/robots',
		[
			'@nuxtjs/google-fonts',
			{
				families: {
					'Noto+Sans': true
				}
			}
		],
		[
			'@nuxt/icon',
			{
				icon: {
					mode: 'css',
					cssLayer: 'base',
					size: '48px'
				}
			}
		]
	],
	sitemap: {
		sources: ['https://app.earth-app.com/sitemap.xml']
	}
});
