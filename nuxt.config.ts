import tailwindcss from '@tailwindcss/vite';
import { defineOrganization } from 'nuxt-schema-org/schema';

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
	app: {
		head: {
			link: [{ rel: 'canonical', href: 'https://earth-app.com' }]
		}
	},
	modules: [
		'@nuxtjs/sitemap',
		'@nuxtjs/robots',
		'nuxt-schema-org',
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
		sources: ['https://app.earth-app.com/__sitemap__/en-US.xml']
	},
	schemaOrg: {
		identity: defineOrganization({
			name: 'The Earth App',
			logo: '/favicon.png',
			url: 'https://earth-app.com'
		})
	}
});
