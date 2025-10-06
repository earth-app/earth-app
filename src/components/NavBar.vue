<template>
	<div
		id="navbar"
		class="bg-secondary flex items-center p-4 text-white font-title border-b-primary border-b-8 w-full"
	>
		<div class="flex items-center">
			<a href="https://app.earth-app.com">
				<img
					src="/favicon.png"
					alt="Earth App Logo"
					class="h-8 w-8 mr-2"
				/>
			</a>
			<h1>{{ SITE_NAME }}</h1>
		</div>
		<a
			class="ml-auto"
			href="https://github.com/earth-app"
			target="_blank"
		>
			<Icon
				name="uil:github"
				title="GitHub"
				size="36px"
			/>
		</a>
		<a
			href="https://instagram.com/theearthapp"
			target="_blank"
		>
			<Icon
				name="uil:instagram"
				title="Instagram"
				size="36px"
			/>
		</a>
		<a
			href="https://twitter.com/the_earth_app"
			target="_blank"
		>
			<Icon
				name="uil:twitter"
				title="Twitter"
				size="36px"
			/>
		</a>
		<a
			href="https://patreon.com/gmitch215"
			target="_blank"
		>
			<Icon
				name="mdi:patreon"
				title="Patreon"
				size="36px"
			/>
		</a>
	</div>
</template>

<script setup lang="ts">
import { SITE_NAME } from '#imports';
</script>
