<template>
	<main class="min-h-screen h-full pb-8 text-white">
		<div class="flex flex-col items-center justify-center w-full">
			<h1 class="text-4xl font-bold mt-8">{{ SITE_NAME }}</h1>
			<a
				ref="containerRef"
				href="https://app.earth-app.com"
				class="relative my-12 sm:my-16 md:my-22 size-24 sm:size-32 md:size-40 lg:size-56"
			>
				<img
					src="/favicon.png"
					alt="Earth App Logo"
					class="absolute h-full w-full rounded-full"
				/>

				<Icon
					v-for="(icon, idx) in icons"
					:key="idx"
					:name="icon.name"
					:title="`Satellite ${idx + 1}`"
					size="calc(12px + 1vw + 1vh)"
					class="absolute z-20"
					:style="iconStyle(idx, icon.offset, icon.radius)"
				/>
			</a>
			<h1
				class="font-title text-center text-2xl md:text-3xl mb-2 mt-8 md:mt-8 lg:mt-0 hover:cursor-pointer"
				@click="navigateTo('https://app.earth-app.com', { external: true })"
			>
				Find Your Novelty.
			</h1>
			<h1
				class="font-title text-center text-2xl md:text-3xl mb-2 hover:cursor-pointer"
				@click="navigateTo('https://app.earth-app.com', { external: true })"
			>
				Try New Things.
			</h1>
			<h1
				class="font-title text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-blue-500 hover:cursor-pointer"
				@click="navigateTo('https://app.earth-app.com', { external: true })"
			>
				Discover the World.
			</h1>
			<h3 class="hover:text-primary transition font-medium">
				<a href="https://app.earth-app.com">Click to Get Started.</a>
			</h3>
			<InfoCard
				title="Proactive"
				icon="lucide:handshake"
				description="Prioritize finding something that suits you, not just what looks good on a profile."
				class="md:absolute mb-2 mt-8 md:my-0 bg-orange-500 shadow-lg shadow-orange-500/50 left-1/24 top-1/7 min-w-50 w-1/6 motion-delay-600 hover:opacity-90 transform hover:cursor-pointer"
				@click="navigateTo('https://app.earth-app.com', { external: true })"
			/>
			<InfoCard
				title="Personal"
				icon="material-symbols:person-add-rounded"
				description="Connect with culture, community, and creative outlets just for you."
				class="md:absolute my-2 md:my-0 bg-blue-500 shadow-lg shadow-blue-500/50 right-1/24 top-1/6 min-w-50 w-1/6 motion-delay-1100 hover:opacity-90 transform hover:cursor-pointer"
				@click="navigateTo('https://app.earth-app.com', { external: true })"
			/>
			<InfoCard
				title="Private"
				icon="charm:shield-tick"
				description="Standard end-to-end encryption ensures you prioritize novelty over noise."
				class="md:absolute my-2 md:my-0 bg-green-500 shadow-lg shadow-green-500/50 left-1/16 top-3/7 min-w-50 w-1/6 motion-delay-1600 hover:opacity-90 transform hover:cursor-pointer"
				@click="navigateTo('https://app.earth-app.com', { external: true })"
			/>
			<InfoCard
				title="Powerful"
				icon="mdi:gear"
				description="AI-powered features enchance your experience, keeping you engaged, informed, and connected."
				class="md:absolute my-2 md:my-0 bg-purple-500 shadow-lg shadow-purple-500/50 right-1/48 top-5/13 min-w-50 w-1/6 motion-delay-2100 hover:opacity-90 transform hover:cursor-pointer"
				@click="navigateTo('https://app.earth-app.com', { external: true })"
			/>
		</div>
	</main>
</template>

<script setup lang="js">
import InfoCard from './InfoCard.vue';

const icons = [
	{ name: 'carbon:satellite', speed: 6, radius: 60 },
	{ name: 'solar:satellite-linear', speed: 8, radius: 80 },
	{ name: 'circum:satellite-1', speed: 6 },
	{ name: 'material-symbols-light:satellite-alt-outline', speed: 7 },
	{ name: 'solar:rocket-bold-duotone', speed: 4, offset: 60, radius: 75 },
	{ name: 'mdi:space-station', speed: 5, offset: 120 }
];

const containerRef = ref(null);

const angles = icons.map(() => ref(0));
let rafId = null;
let lastTimestamp = 0;

function animateFrame(timestamp) {
	if (!lastTimestamp) lastTimestamp = timestamp;
	const deltaMs = timestamp - lastTimestamp;
	lastTimestamp = timestamp;

	icons.forEach((icon, idx) => {
		const degreesPerMs = 360 / (icon.speed * 1000);
		angles[idx].value = (angles[idx].value + degreesPerMs * deltaMs) % 360;
	});

	rafId = requestAnimationFrame(animateFrame);
}

function iconStyle(idx, offset, radius) {
	const baseAngle = offset ?? (360 / icons.length) * idx;
	const total = angles[idx].value + baseAngle;
	const rad = (total * Math.PI) / 180;
	const radiusPercent = radius ?? 65;
	const x = 50 + Math.cos(rad) * radiusPercent;
	const y = 50 + Math.sin(rad) * radiusPercent;
	return {
		top: `${y}%`,
		left: `${x}%`,
		transform: 'translate(-50%, -50%)'
	};
}

onMounted(() => {
	rafId = requestAnimationFrame(animateFrame);
});

onUnmounted(() => {
	if (rafId) cancelAnimationFrame(rafId);
});
</script>
