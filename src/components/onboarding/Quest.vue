<template>
	<OnboardingQuestTimeline
		ref="timeline"
		:quest="onboardingQuest"
		@next="next"
		@done="done"
	/>
</template>

<script setup lang="ts">
import type QuestTimeline from './QuestTimeline.vue';

const emit = defineEmits<{
	(event: 'done'): void;
}>();

const steps: QuestStep[] = [
	{
		type: 'take_photo',
		title: 'Take a Photo',
		description:
			'First thing to do is to capture the moment. When you see something interesting, take a photo of it to start your quest!'
	},
	{
		type: 'read_activity',
		title: 'Explore an Interest',
		description:
			'Need a new sport, hobby, or something to talk about? Check out the activities section to find something that sparks your interest!',
		link: 'https://app.earth-app.com/activities',
		reward: 10
	},
	{
		type: 'answer_prompt',
		title: 'Answer a Question',
		description:
			"Ask and talk about questions! Answer life's big questions or ask your own to connect with others and share your perspective.",
		link: 'https://app.earth-app.com/prompts'
	},
	{
		type: 'type_text',
		title: 'Share your Thoughts',
		description:
			'As you complete the quest, share your thoughts and experiences in the app to connect with others.',
		reward: 25
	},
	{
		type: 'read_article',
		title: 'Read an Article',
		description:
			'Expand your horizons by reading an article in the app. It could be about anything - nature, science, philosophy, or even a story from another user!',
		link: 'https://app.earth-app.com/articles'
	},
	{
		type: 'attend_event',
		title: 'Join an Event',
		description:
			'Participate in an event to meet other explorers and share your passion for the Earth. It could be a local cleanup, a virtual discussion, or anything in between!',
		link: 'https://app.earth-app.com/events'
	},
	{
		type: 'take_photo',
		title: 'Take another Photo',
		description:
			"Now that you've explored a bit, take a photo of something that represents your journey so far!"
	},
	{
		type: 'quest',
		title: 'Complete a Quest',
		description:
			'The Earth App compiles all of these into Quests, which are like mini-adventures you can go on in the app. Earn points and compete with your friends as you complete quests and explore the world around you!'
	},
	{
		type: 'sign_up',
		title: 'Create an Account',
		description: 'Sign up to start your journey and connect with other explorers!',
		link: 'https://app.earth-app.com/signup'
	}
];

const onboardingQuest: Quest = {
	title: 'Welcome to The Earth App!',
	description: 'This is your onboarding quest. Complete it to learn how to use the app!',
	icon: 'mdi:earth',
	steps,
	reward: 100
};

const toast = useToast();

const timeline = ref<InstanceType<typeof QuestTimeline>>();

function next() {
	const currentIndex = timeline.value?.currentIndex;
	const currentStep = timeline.value?.currentStep;
	if (!currentStep || currentIndex === undefined) return;

	toast.add({
		title: `Step ${currentIndex + 1}: ${currentStep.title}`,
		description: currentStep.description,
		icon: 'mdi:check-circle',
		actions: currentStep.link
			? [
					{
						label: 'Go',
						onClick: () => {
							navigateTo(currentStep.link!, { external: true });
						}
					}
				]
			: undefined,
		duration: 10000
	});
}

function done() {
	toast.add({
		title: 'Tutorial Complete',
		description: 'You have completed the onboarding tutorial.',
		icon: 'mdi:check-circle'
	});
	emit('done');
}
</script>
