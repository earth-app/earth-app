<template>
	<div class="flex flex-col w-full h-full">
		<div class="flex flex-col sm:flex-row items-center justify-between w-full px-8 gap-2">
			<UButton
				color="primary"
				variant="soft"
				class="self-center text-center w-2/5 min-w-64"
				icon="mdi:earth"
				>Welcome to The Earth App!</UButton
			>

			<UButton
				color="success"
				variant="outline"
				class="self-center text-center w-2/5 min-w-64"
				icon="mdi:arrow-right-bold"
				@click="next"
				>{{
					currentIndex === -1
						? 'Click Me!'
						: currentIndex >= props.quest.steps.length - 1
							? 'Exit Tutorial'
							: 'Next'
				}}</UButton
			>
		</div>

		<div class="flex flex-col items-start px-12 w-full mt-8">
			<div
				v-for="(item, index) in items"
				:key="index"
				class="flex flex-col items-center"
			>
				<div class="flex gap-2 items-stretch justify-center my-2">
					<div class="flex flex-col items-center gap-2 min-h-full">
						<UPopover arrow>
							<div class="flex flex-col items-center gap-1">
								<LazyUBadge
									:id="`tile-${index}`"
									:icon="item.icon"
									:color="
										isCurrentStep(index) ? 'success' : item.completed ? 'warning' : 'secondary'
									"
									:variant="item.completed ? 'solid' : 'subtle'"
									size="xl"
									class="transition-colors duration-500"
									hydrate-on-visible
								/>

								<span
									v-if="item.reward"
									class="text-xs opacity-70"
									>+{{ item.reward }}</span
								>
							</div>
							<template #content>
								<div class="flex items-center justify-center p-4 max-w-72 gap-1">
									<UIcon
										:name="item.icon"
										class="min-h-8 min-w-8 size-8 text-primary"
									/>
									<div class="flex flex-col ml-2">
										<p class="text-sm opacity-90">{{ item.description }}</p>
										<p
											v-if="item.reward"
											class="text-xs opacity-70 mt-1"
										>
											Reward: {{ item.reward }} Impact Points
										</p>
									</div>
								</div>
							</template>
						</UPopover>

						<div
							:class="[
								'w-2 min-h-36 h-full rounded-full transition-colors duration-200',
								Number(item.completed) ? 'bg-primary' : 'bg-gray-300'
							]"
						></div>
					</div>

					<div
						class="flex flex-col items-start gap-1 transition-opacity duration-200"
						:class="
							Number(item.completed)
								? 'opacity-70'
								: Number(isCurrentStep(index))
									? 'opacity-100'
									: 'opacity-0'
						"
					>
						<span class="text-sm font-medium">{{ item.title }}</span>
						<p class="text-xs opacity-70 max-w-xs">{{ item.description }}</p>

						<div class="flex gap-2 mt-2">
							<UButton
								v-if="isCurrentStep(index)"
								color="success"
								variant="soft"
								trailing-icon="mdi:arrow-right"
								size="sm"
								@click="next"
							>
								{{
									index === -1
										? 'Start'
										: currentIndex >= props.quest.steps.length - 1
											? 'Finish'
											: 'Next'
								}}
							</UButton>
							<UButton
								v-if="item.link"
								color="info"
								variant="soft"
								trailing-icon="mdi:open-in-new"
								size="sm"
								:href="item.link"
								target="_blank"
							>
								Visit
							</UButton>
							<UButton
								v-else-if="item.type === 'take_photo'"
								color="primary"
								variant="soft"
								icon="mdi:camera"
								size="sm"
								@click="openCamera(item.index)"
								:disabled="!isCurrentStep(index)"
							>
								Snap a Picture
							</UButton>
						</div>

						<textarea
							v-if="item.type === 'type_text'"
							type="text"
							placeholder="I'm currently feeling..."
							wrap="hard"
							:disabled="!isCurrentStep(index)"
							class="w-full h-full text-sm min-w-60 my-2 p-2 border border-gray-300 rounded-md resize-none"
						/>

						<!-- Captured photo thumbnail -->
						<img
							v-if="item.type === 'take_photo' && currentImages[item.index]"
							:src="currentImages[item.index]"
							:alt="item.title"
							class="mt-2 w-full max-h-48 object-cover rounded-lg border border-gray-200"
						/>
					</div>
				</div>
			</div>

			<div class="flex flex-col items-center min-h-36 gap-1">
				<LazyUBadge
					icon="mdi:medal-outline"
					color="warning"
					variant="solid"
					size="xl"
					class="self-center"
					hydrate-on-visible
				/>
				<span class="text-xs opacity-70">+{{ props.quest.reward }}</span>
			</div>
		</div>

		<Transition name="camera-fade">
			<div
				v-if="cameraOpen"
				class="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4"
				@click.self="closeCamera"
			>
				<div
					class="relative min-h-96 w-72 aspect-3/4 bg-neutral-950 border-8 border-neutral-900/40 rounded-2xl"
					style="overflow: hidden; isolation: isolate"
					@click.stop
				>
					<canvas
						ref="canvasEl"
						class="hidden"
					/>

					<div
						v-if="cameraStage === 'permission'"
						class="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center"
					>
						<div
							class="w-20 h-20 rounded-full border-2 border-lime-400 flex items-center justify-center animate-ring-pulse"
						>
							<UIcon
								name="i-lucide-camera"
								class="text-3xl text-lime-400"
							/>
						</div>
						<p class="text-xs font-semibold tracking-widest uppercase text-neutral-100">
							Camera Access Required
						</p>
						<p class="text-xs text-neutral-500 leading-relaxed">
							This uses your camera directly.<br />No file uploads permitted.
						</p>
						<button
							class="mt-2 px-6 py-2.5 rounded-xl bg-neutral-800 text-white text-sm font-medium tracking-wide"
							@click="startCamera"
						>
							Enable Camera
						</button>
					</div>

					<!-- Error stage -->
					<div
						v-else-if="cameraStage === 'error'"
						class="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center"
					>
						<div
							class="w-20 h-20 rounded-full border-2 border-red-500 flex items-center justify-center"
						>
							<UIcon
								name="i-lucide-camera-off"
								class="text-3xl text-red-400"
							/>
						</div>
						<p class="text-xs font-medium tracking-widest uppercase text-red-400">
							Camera Unavailable
						</p>
						<p class="text-xs text-neutral-500 leading-relaxed">{{ cameraError }}</p>
						<button
							class="mt-2 px-6 py-2 rounded-xl border border-neutral-700 text-white text-sm"
							@click="startCamera"
						>
							Try Again
						</button>
					</div>

					<!-- Live stage -->
					<div
						v-else-if="cameraStage === 'live'"
						class="absolute inset-0 flex flex-col"
					>
						<video
							ref="videoEl"
							class="w-full h-full object-cover block"
							:class="{ '-scale-x-100': facingMode === 'user' }"
							autoplay
							playsinline
							muted
						/>

						<!-- Flash overlay -->
						<div
							class="absolute inset-0 bg-white pointer-events-none transition-opacity duration-100"
							:class="isFlashing ? 'opacity-100' : 'opacity-0'"
						/>

						<!-- Corner brackets -->
						<span class="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-lime-400" />
						<span class="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-lime-400" />
						<span class="absolute bottom-20 left-4 w-7 h-7 border-b-2 border-l-2 border-lime-400" />
						<span
							class="absolute bottom-20 right-4 w-7 h-7 border-b-2 border-r-2 border-lime-400"
						/>

						<!-- Top bar -->
						<div
							class="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4 pb-8"
							style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.55), transparent)"
						>
							<span
								class="flex items-center ml-2 mt-2 gap-1.5 text-xs tracking-widest uppercase text-lime-400"
							>
								<span class="w-1.5 h-1.5 rounded-full bg-lime-400 animate-blink" />
								LIVE
							</span>
							<button
								class="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white"
								@click="closeCamera"
							>
								<UIcon
									name="i-lucide-x"
									class="text-lg"
								/>
							</button>
						</div>

						<!-- Bottom controls -->
						<div
							class="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 py-5 pb-7"
							style="background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent)"
						>
							<div class="w-12 h-12" />

							<!-- Shutter -->
							<button
								class="relative w-16 h-16 rounded-full border-4 border-white bg-transparent cursor-pointer active:scale-90 transition-transform duration-100"
								aria-label="Take photo"
								@click="takePhoto"
							>
								<span class="absolute inset-1.5 rounded-full bg-white block" />
							</button>

							<!-- Flip -->
							<button
								class="w-12 h-12 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer hover:border-white/45 transition-all duration-300"
								:style="{ transform: isFlipping ? 'rotate(180deg)' : 'rotate(0deg)' }"
								aria-label="Flip camera"
								@click="flipCamera"
							>
								<UIcon
									name="i-lucide-refresh-cw"
									class="text-xl"
								/>
							</button>
						</div>
					</div>

					<!-- Preview stage -->
					<div
						v-else-if="cameraStage === 'preview'"
						class="absolute inset-0 flex flex-col"
					>
						<img
							:src="previewSrc"
							class="w-full h-full object-cover block"
							:class="{ '-scale-x-100': facingMode === 'user' }"
							alt="Captured photo"
						/>

						<!-- Corner brackets -->
						<span class="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-white/40" />
						<span class="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-white/40" />
						<span class="absolute bottom-20 left-4 w-7 h-7 border-b-2 border-l-2 border-white/40" />
						<span
							class="absolute bottom-20 right-4 w-7 h-7 border-b-2 border-r-2 border-white/40"
						/>

						<!-- Top bar -->
						<div
							class="absolute top-0 left-0 right-0 flex items-center px-4 pt-4 pb-8"
							style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.55), transparent)"
						>
							<span
								class="ml-2 mt-2 text-xs tracking-widest uppercase text-white/50 px-2 py-0.5 border border-white/15 rounded bg-white/[0.07]"
							>
								PREVIEW
							</span>
						</div>

						<!-- Bottom controls -->
						<div
							class="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 py-5 pb-7"
							style="background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent)"
						>
							<!-- Retake -->
							<button
								class="w-12 h-12 rounded-full border border-red-500/50 bg-black/30 backdrop-blur-sm flex items-center justify-center text-red-400 cursor-pointer hover:border-red-400 transition-colors duration-200"
								aria-label="Retake"
								@click="rejectPhoto"
							>
								<UIcon
									name="i-lucide-x"
									class="text-xl"
								/>
							</button>

							<!-- Accept -->
							<button
								class="w-16 h-16 rounded-full flex items-center justify-center bg-lime-400 cursor-pointer hover:bg-lime-300 active:scale-90 transition-all duration-100"
								style="box-shadow: 0 0 28px rgb(163 230 53 / 0.45)"
								aria-label="Accept photo"
								@click="acceptPhoto"
							>
								<UIcon
									name="i-lucide-check"
									class="text-3xl text-neutral-900"
								/>
							</button>

							<div class="w-12 h-12" />
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	quest: Quest;
}>();

const now = ref(Date.now());
let _nowTimer: ReturnType<typeof setInterval>;

const emit = defineEmits<{
	(event: 'next', step?: QuestStep | QuestStep[]): void;
	(event: 'done'): void;
}>();

onMounted(() => {
	_nowTimer = setInterval(() => {
		now.value = Date.now();
	}, 10_000);
});

onUnmounted(() => {
	clearInterval(_nowTimer);
	stopStream();
});

function isCurrentStep(index: number) {
	return currentIndex.value === index;
}

function getStepIcon(step: string) {
	switch (step) {
		case 'take_photo':
			return 'mdi:camera-enhance';
		case 'type_text':
			return 'mdi:pencil';
		case 'read_article':
			return 'mdi:book-open-page-variant';
		case 'read_activity':
			return 'mdi:run';
		case 'answer_prompt':
			return 'mdi:message-text';
		case 'attend_event':
			return 'mdi:calendar-star';
		case 'quest':
			return 'mdi:sword';
		case 'sign_up':
			return 'mdi:account-plus';
		default:
			return 'mdi:account';
	}
}

const items = computed(() => {
	if (!props.quest) return [];

	return props.quest.steps.map((step, index) => {
		return {
			...step,
			icon: getStepIcon(step.type),
			index,
			completed: currentIndex.value > index
		};
	});
});

const currentIndex = ref(-1);
const currentStep = computed(() => {
	const step = props.quest.steps[currentIndex.value];
	return step;
});

function next() {
	if (currentIndex.value >= props.quest.steps.length - 1) {
		emit('done');
		return;
	}

	currentIndex.value++;
	emit('next', props.quest.steps[currentIndex.value]);

	const stepEl = document.getElementById(`tile-${currentIndex.value}`);
	const currentModal = document.querySelector('.u-modal.u-modal-open');
	if (currentModal) {
		currentModal.scrollTo({
			top: stepEl?.offsetTop! - currentModal.clientHeight / 2 + 40,
			behavior: 'smooth'
		});
	} else {
		stepEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
}

defineExpose({
	currentStep,
	currentIndex,
	next
});

// ─── Captured blobs (one slot per quest step) ────────────────────────────────

const currentBlobs = ref<Blob[]>(Array(props.quest.steps.length).fill(undefined));
const currentImages = computed(() =>
	currentBlobs.value.map((blob) => (blob ? URL.createObjectURL(blob) : undefined))
);

onUnmounted(() => {
	currentImages.value.forEach((url) => {
		if (url) URL.revokeObjectURL(url);
	});
});

// ─── Camera state ─────────────────────────────────────────────────────────────

type CameraStage = 'permission' | 'live' | 'preview' | 'error';

const cameraOpen = ref(false);
const cameraStage = ref<CameraStage>('permission');
const cameraError = ref('');
const facingMode = ref<'environment' | 'user'>('environment');
const isFlipping = ref(false);
const isFlashing = ref(false);
const previewSrc = ref('');

const videoEl = ref<HTMLVideoElement | null>(null);
const canvasEl = ref<HTMLCanvasElement | null>(null);

let stream: MediaStream | null = null;
let activePhotoIndex = -1;

function openCamera(index: number) {
	activePhotoIndex = index;
	cameraStage.value = 'permission';
	previewSrc.value = '';
	cameraOpen.value = true;
}

function closeCamera() {
	stopStream();
	cameraOpen.value = false;
}

function stopStream() {
	stream?.getTracks().forEach((t) => t.stop());
	stream = null;
}

async function startCamera() {
	stopStream();
	try {
		stream = await navigator.mediaDevices.getUserMedia({
			video: { facingMode: facingMode.value, width: { ideal: 1920 }, height: { ideal: 1080 } },
			audio: false
		});
		cameraStage.value = 'live';
		await nextTick();
		if (videoEl.value) {
			videoEl.value.srcObject = stream;
			await videoEl.value.play();
		}
	} catch (e: any) {
		cameraStage.value = 'error';
		cameraError.value =
			e?.name === 'NotAllowedError'
				? 'Camera access was denied. Please allow camera permissions in your browser settings.'
				: 'Unable to access your camera. Make sure no other app is using it.';
	}
}

async function flipCamera() {
	isFlipping.value = true;
	facingMode.value = facingMode.value === 'environment' ? 'user' : 'environment';
	await startCamera();
	setTimeout(() => (isFlipping.value = false), 400);
}

async function takePhoto() {
	if (!videoEl.value || !canvasEl.value) return;

	isFlashing.value = true;
	setTimeout(() => (isFlashing.value = false), 120);

	const video = videoEl.value;
	const canvas = canvasEl.value;
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	canvas.getContext('2d')!.drawImage(video, 0, 0);

	previewSrc.value = canvas.toDataURL('image/jpeg', 0.92);
	stopStream();
	cameraStage.value = 'preview';
}

function rejectPhoto() {
	previewSrc.value = '';
	startCamera();
}

function acceptPhoto() {
	if (!previewSrc.value) return;

	const commaIdx = previewSrc.value.indexOf(',');
	const b64 = previewSrc.value.slice(commaIdx + 1);
	const binary = atob(b64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	const blob = new Blob([bytes], { type: 'image/jpeg' });

	// Store blob in the correct slot and close the camera
	const updated = [...currentBlobs.value];
	updated[activePhotoIndex] = blob;
	currentBlobs.value = updated;

	closeCamera();
}
</script>

<style scoped>
@keyframes ring-pulse {
	0%,
	100% {
		box-shadow: 0 0 0 0 rgb(163 230 53 / 0.3);
	}
	50% {
		box-shadow: 0 0 0 14px rgb(163 230 53 / 0);
	}
}
@keyframes blink {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
}

.animate-ring-pulse {
	animation: ring-pulse 2s ease-in-out infinite;
}
.animate-blink {
	animation: blink 1.2s step-start infinite;
}

.camera-fade-enter-active,
.camera-fade-leave-active {
	transition: opacity 0.2s ease;
}
.camera-fade-enter-from,
.camera-fade-leave-to {
	opacity: 0;
}
</style>
