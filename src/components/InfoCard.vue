<template>
	<div
		class="rounded-lg text-white font-roboto p-3 border-accent border-3 motion-opacity-in-0 motion-translate-y-in-25 motion-duration-900"
	>
		<div class="flex items-center text-center place-items-center mb-2">
			<Icon
				v-if="icon"
				:name="icon"
				size="3vw"
			/>
			<h2 class="font-semibold ml-4 text-sm md:text-md lg:text-lg">{{ title }}</h2>
		</div>
		<p class="text-xs md:text-sm lg:text-md">{{ description }}</p>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	title: string;
	icon?: string;
	description?: string;
}>();
</script>
