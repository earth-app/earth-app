<template>
	<div class="flex flex-col items-center w-full">
		<Primary />

		<UButton
			class="mt-4"
			color="neutral"
			icon="mdi:restart"
			@click="showModal = true"
			>Try Onboarding Again</UButton
		>

		<div class="flex flex-col sm:flex-row my-8">
			<NuxtLink
				to="https://apps.apple.com/us/app/the-earth-app/id6771985151?itscg=30200&itsct=apps_box_badge&mttnsubad=6771985151"
				target="_blank"
				style="display: inline-block"
			>
				<img
					src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1782172800"
					alt="Download on the App Store"
					style="width: 246px; height: 82px; vertical-align: middle; object-fit: contain"
				/>
			</NuxtLink>
		</div>

		<UModal
			v-model:open="showModal"
			title="Welcome to The Earth App!"
			description="Let's get you started with your onboarding journey."
			class="w-full sm:min-w-80 max-w-160"
		>
			<template #body>
				<OnboardingQuest @done="done" />
			</template>
		</UModal>
	</div>
</template>

<script setup lang="ts">
const { visitedSite, markVisited } = useVisitedSite();
const showModal = ref(false);

onMounted(() => {
	if (!visitedSite.value) {
		showModal.value = true;
		markVisited();
	}
});

function done() {
	showModal.value = false;
	navigateTo('https://app.earth-app.com/signup', { external: true });
}
</script>
