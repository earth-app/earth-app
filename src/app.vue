<template>
	<div
		id="app"
		class="bg-gray-800 min-h-screen min-w-screen h-full w-full"
	>
		<NavBar />
		<Body />
	</div>
</template>

<script setup>
import Body from './components/Body.vue';
import NavBar from './components/NavBar.vue';

useSeoMeta({
	charset: 'utf-8',
	viewport: {
		width: 'device-width',
		initialScale: 1,
		minimumScale: 1,
		maximumScale: 1,
		userScalable: 'no'
	},
	applicationName: SITE_NAME,
	title: SITE_NAME,
	description: SITE_DESCRIPTION,
	ogTitle: SITE_NAME,
	author: 'Gregory Mitchell',
	creator: 'Gregory Mitchell',
	ogDescription: SITE_DESCRIPTION,
	ogImage: 'https://cdn.earth-app.com/earth-app.png',
	ogLocale: 'en_US',
	ogType: 'website',
	ogSiteName: SITE_NAME,
	ogUrl: 'https://earth-app.com',
	twitterTitle: SITE_NAME,
	twitterDescription: SITE_DESCRIPTION,
	twitterCard: 'summary_large_image',
	twitterCreator: '@the_earth_app',
	themeColor: {
		color: THEME_COLOR,
		media: '(prefers-color-scheme: dark)'
	},
	msapplicationTileColor: THEME_COLOR,
	msapplicationTileImage: '/earth-app.png',
	mobileWebAppCapable: 'yes',
	appleMobileWebAppCapable: 'yes',
	appleMobileWebAppStatusBarStyle: 'black'
});
</script>
