import tailwindcss from '@tailwindcss/vite';
import { defineOrganization } from 'nuxt-schema-org/schema';

export default defineNuxtConfig({
	ssr: true,
	compatibilityDate: '2025-12-13',
	devtools: { enabled: process.env.NODE_ENV !== 'production' },
	srcDir: 'src',
	css: ['~/assets/css/main.css'],
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			include: ['@vue/devtools-core', '@vue/devtools-kit']
		}
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
			link: [
				{ rel: 'canonical', href: 'https://earth-app.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
				{ rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
				{ rel: 'preconnect', href: 'https://api.earth-app.com' },
				{ rel: 'dns-prefetch', href: 'https://api.earth-app.com', crossorigin: 'use-credentials' }
			]
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
		},
		'/support': {
			redirect: {
				to: 'https://support.earth-app.com',
				statusCode: 301
			}
		},
		'/ios': {
			redirect: {
				to: 'https://apps.apple.com/app/the-earth-app/id6771985151',
				statusCode: 301
			}
		}
	},
	modules: [
		'@nuxtjs/sitemap',
		'@nuxtjs/robots',
		'@nuxt/ui',
		'@nuxt/hints',
		'@nuxt/image',
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
	site: {
		url: 'https://earth-app.com',
		name: 'The Earth App',
		description: 'Explore with real people',
		defaultLocale: 'en-US'
	},
	sitemap: {
		excludeAppSources: ['nuxt:route-rules'],
		discoverImages: false,
		urls: [
			{
				loc: '/',
				changefreq: 'weekly',
				priority: 1,
				images: [
					{
						loc: 'https://cdn.earth-app.com/earth-app.png',
						title: 'The Earth App',
						caption: 'Explore with real people'
					}
				]
			}
		],
		defaults: {
			changefreq: 'monthly',
			priority: 0.7
		}
	},
	robots: {
		mergeWithRobotsTxtPath: false,
		groups: [
			{
				userAgent: ['*'],
				allow: ['/']
			}
		]
	},
	schemaOrg: {
		identity: defineOrganization({
			name: 'The Earth App',
			alternateName: 'Earth App',
			description:
				'The anti-doomscroll app to explore hobbies, sports, and passions with real people.',
			logo: '/favicon.png',
			url: 'https://earth-app.com',
			sameAs: [
				'https://github.com/earth-app',
				'https://instagram.com/theearthapp',
				'https://twitter.com/the_earth_app',
				'https://youtube.com/@the_earth_app',
				'https://patreon.com/gmitch215'
			]
		})
	}
});
