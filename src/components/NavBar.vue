<template>
	<div
		id="navbar"
		class="bg-secondary flex items-center p-4 text-white font-title border-b-primary border-b-8 w-full"
	>
		<div class="flex items-center justify-evenly">
			<div class="flex items-center justify-center lg:mr-8 xl:mr-12">
				<NuxtLink
					to="https://app.earth-app.com"
					class="size-8"
				>
					<img
						src="/favicon.png"
						alt="Earth App Logo"
						class="min-w-8 h-auto mr-3"
					/>
				</NuxtLink>
				<h1 class="hidden md:inline-block sm:text-sm mx-2">{{ appConfig.name }}</h1>
			</div>
			<div class="flex items-center justify-center">
				<h2 class="mx-4 text-xs lg:text-sm text-center font-medium text-gray-200">
					Dig deep and explore the world around you.
				</h2>
			</div>
		</div>
		<div
			class="ml-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-2 *:hover:text-primary *:transition-all *:duration-300"
		>
			<NuxtLink
				to="https://github.com/earth-app"
				target="_blank"
				external
			>
				<UIcon
					name="uil:github"
					title="GitHub"
					size="calc(10px + 1.1vw + 1.5vh)"
				/>
			</NuxtLink>
			<NuxtLink
				to="https://instagram.com/theearthapp"
				target="_blank"
				external
			>
				<UIcon
					name="uil:instagram"
					title="Instagram"
					size="calc(10px + 1.1vw + 1.5vh)"
				/>
			</NuxtLink>
			<NuxtLink
				to="https://twitter.com/the_earth_app"
				target="_blank"
				external
			>
				<UIcon
					name="uil:twitter"
					title="Twitter"
					size="calc(10px + 1.1vw + 1.5vh)"
				/>
			</NuxtLink>
			<NuxtLink
				to="https://patreon.com/gmitch215"
				target="_blank"
				external
			>
				<UIcon
					name="mdi:patreon"
					title="Patreon"
					size="calc(10px + 1.1vw + 1.5vh)"
				/>
			</NuxtLink>
			<NuxtLink
				to="https://youtube.com/@the_earth_app"
				target="_blank"
				external
			>
				<UIcon
					name="uil:youtube"
					title="YouTube"
					size="calc(10px + 1.1vw + 1.5vh)"
				/>
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
</script>
