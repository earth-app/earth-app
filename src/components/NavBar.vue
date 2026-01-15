<template>
	<div
		id="navbar"
		class="bg-secondary flex items-center p-4 text-white font-title border-b-primary border-b-8 w-full"
	>
		<div class="flex items-center justify-center">
			<a
				href="https://app.earth-app.com"
				class="size-8"
			>
				<img
					src="/favicon.png"
					alt="Earth App Logo"
					class="min-w-8 h-auto mr-3"
				/>
			</a>
			<h1 class="hidden md:inline-block sm:text-sm mx-2">{{ SITE_NAME }}</h1>
			<h2 class="mx-4 text-xs text-gray-200">
				An app for you to try new things and explore novelty around the world
			</h2>
		</div>
		<div
			class="ml-auto flex gap-x-3 text-sm font-semibold *:hover:text-primary *:transition-all *:duration-300"
		>
			<a href="/docs">Documentation</a>
			<a href="/api">API</a>
			<a href="/about">About</a>
			<a href="/blog">Blog</a>
			<a href="/tos">Terms of Service</a>
			<a href="/privacy-policy">Privacy Policy</a>
		</div>
		<div class="ml-auto flex gap-x-2 *:hover:text-primary *:transition-all *:duration-300">
			<a
				href="https://github.com/earth-app"
				target="_blank"
			>
				<Icon
					name="uil:github"
					title="GitHub"
					size="calc(10px + 1.5vw + 1.5vh)"
				/>
			</a>
			<a
				href="https://instagram.com/theearthapp"
				target="_blank"
			>
				<Icon
					name="uil:instagram"
					title="Instagram"
					size="calc(10px + 1.5vw + 1.5vh)"
				/>
			</a>
			<a
				href="https://twitter.com/the_earth_app"
				target="_blank"
			>
				<Icon
					name="uil:twitter"
					title="Twitter"
					size="calc(10px + 1.5vw + 1.5vh)"
				/>
			</a>
			<a
				href="https://patreon.com/gmitch215"
				target="_blank"
			>
				<Icon
					name="mdi:patreon"
					title="Patreon"
					size="calc(10px + 1.5vw + 1.5vh)"
				/>
			</a>
			<a
				href="https://youtube.com/@the_earth_app"
				target="_blank"
			>
				<Icon
					name="uil:youtube"
					title="YouTube"
					size="calc(10px + 1.5vw + 1.5vh)"
				/>
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import { SITE_NAME } from '#imports';
</script>
