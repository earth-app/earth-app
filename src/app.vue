<template>
	<UApp :toaster="{ expand: false }">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</UApp>
</template>

<script setup>
const appConfig = useAppConfig();

useSeoMeta({
	charset: 'utf-8',
	viewport: {
		width: 'device-width',
		initialScale: 1,
		minimumScale: 1,
		maximumScale: 1,
		userScalable: 'no'
	},
	applicationName: appConfig.name,
	title: appConfig.name,
	description: appConfig.description,
	ogTitle: appConfig.name,
	author: 'Gregory Mitchell',
	creator: 'Gregory Mitchell',
	ogDescription: appConfig.description,
	ogImage: 'https://cdn.earth-app.com/earth-app.png',
	ogLocale: 'en_US',
	ogType: 'website',
	ogSiteName: appConfig.name,
	ogUrl: 'https://earth-app.com',
	twitterTitle: appConfig.name,
	twitterDescription: appConfig.description,
	twitterCard: 'summary_large_image',
	twitterCreator: '@the_earth_app',
	themeColor: {
		color: appConfig.themeColor,
		media: '(prefers-color-scheme: dark)'
	},
	msapplicationTileColor: appConfig.themeColor,
	msapplicationTileImage: '/earth-app.png',
	mobileWebAppCapable: 'yes',
	appleItunesApp: {
		appId: '6771985151'
	},
	appleMobileWebAppCapable: 'yes',
	appleMobileWebAppStatusBarStyle: 'black'
});

useSchemaOrg([
	defineWebSite({
		name: appConfig.name,
		description: appConfig.description,
		inLanguage: 'en-US'
	}),
	defineSoftwareApp({
		'@type': ['MobileApplication', 'WebApplication'],
		name: appConfig.name,
		description:
			'The anti-doomscroll app to explore hobbies, sports, and passions with real people.',
		applicationCategory: 'LifestyleApplication',
		operatingSystem: 'iOS, Web',
		downloadUrl: 'https://apps.apple.com/app/the-earth-app/id6771985151',
		featureList: [
			'Discover hobbies, sports, and passions',
			'Connect and explore with real people',
			'Guided onboarding quests'
		],
		offers: {
			price: '0',
			priceCurrency: 'USD'
		}
	})
]);
</script>
