import tailwindcss from '@tailwindcss/vite';
import { defineOrganization } from 'nuxt-schema-org/schema';

export default defineNuxtConfig({
	ssr: true,
	compatibilityDate: '2025-12-13',
	devtools: { enabled: process.env.NODE_ENV !== 'production' },
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
	routeRules: {
		'/api': {
			redirect: {
				to: 'https://api.earth-app.com',
				statusCode: 301
			}
		},
		'/app': {
			redirect: {
				to: 'https://app.earth-app.com',
				statusCode: 301
			}
		},
		'/blog': {
			redirect: {
				to: 'https://blog.earth-app.com',
				statusCode: 301
			}
		},
		'/docs': {
			redirect: {
				to: 'https://docs.earth-app.com',
				statusCode: 301
			}
		},
		'/about': {
			redirect: {
				to: 'https://app.earth-app.com/about',
				statusCode: 301
			}
		},
		'/tos': {
			redirect: {
				to: 'https://app.earth-app.com/terms-of-service',
				statusCode: 301
			}
		},
		'/terms-of-service': {
			redirect: {
				to: 'https://app.earth-app.com/terms-of-service',
				statusCode: 301
			}
		},
		'/privacy-policy': {
			redirect: {
				to: 'https://app.earth-app.com/privacy-policy',
				statusCode: 301
			}
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
