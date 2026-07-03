<template>
	<main class="text-white">
		<div class="flex flex-col items-center justify-center w-full">
			<h1 class="text-4xl font-bold mt-8">{{ appConfig.name }}</h1>
			<h2 class="text-2xl font-semibold mt-2 text-blue-400">The Anti-Doomscroll.</h2>
			<NuxtLink
				to="https://app.earth-app.com"
				external
				class="relative my-12 sm:my-16 md:my-22 size-24 sm:size-32 md:size-40 lg:size-48"
			>
				<NuxtImg
					src="/favicon.png"
					alt="Earth App Logo"
					class="absolute h-full w-full rounded-full"
				/>

				<UIcon
					v-for="(icon, idx) in icons"
					:key="idx"
					:name="icon.name"
					:title="`Satellite ${idx + 1}`"
					size="calc(12px + 1vw + 1vh)"
					class="absolute z-20"
					:style="iconStyle(idx, icon.offset, icon.radius)"
				/>
			</NuxtLink>
			<h1
				class="font-title text-center text-2xl md:text-3xl mb-2 mt-8 md:mt-8 lg:mt-0 hover:cursor-pointer"
				@click="goToApp"
			>
				Find your
				<span
					:style="{ color: currentRotation.color }"
					class="font-semibold hover:opacity-80 transition-opacity duration-300"
					>{{ currentRotation.text }}.</span
				>
			</h1>
			<h3 class="hover:text-primary transition font-medium">
				<NuxtLink
					to="https://app.earth-app.com"
					external
					>Click to Get Started.</NuxtLink
				>
			</h3>
		</div>
	</main>
</template>

<script setup lang="js">
const appConfig = useAppConfig();

const icons = [
	{ name: 'carbon:satellite', speed: 6, radius: 60 },
	{ name: 'solar:satellite-linear', speed: 8, radius: 80 },
	{ name: 'circum:satellite-1', speed: 6 },
	{ name: 'material-symbols-light:satellite-alt-outline', speed: 7 },
	{ name: 'solar:rocket-bold-duotone', speed: 4, offset: 60, radius: 75 },
	{ name: 'mdi:space-station', speed: 5, offset: 120 },
	{ name: 'mdi:bottle-rocket', speed: 3, offset: 80, radius: 70 }
];

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

function goToApp() {
	navigateTo('https://app.earth-app.com', { external: true });
}

const rotations = [
	{ text: 'Sport', color: '#FF6B6B' },
	{ text: 'Friends', color: '#3F8A77' },
	{ text: 'Calling', color: '#FFD93D' },
	{ text: 'Favorite Things', color: '#6BCB77' },
	{ text: 'Adventure', color: '#F7B801' },
	{ text: 'Hobby', color: '#FF6F91' },
	{ text: 'Passion', color: '#00B4D8' },
	{ text: 'Curiosity', color: '#FF9671' },
	{ text: 'Fun', color: '#2A9D8F' },
	{ text: 'Excitement', color: '#E76F51' }
];

const currentRotationIndex = ref(Math.floor(Math.random() * rotations.length));
const currentRotation = computed(() => rotations[currentRotationIndex.value]);

onMounted(() => {
	let idx = currentRotationIndex.value;
	setInterval(() => {
		idx = (idx + 1) % rotations.length;
		currentRotationIndex.value = idx;
	}, 2000);
});
</script>
