export type Quest = {
	title: string;
	description: string;
	icon: string;
	steps: QuestStep[];
	reward: number;
};

export type QuestStep = {
	type: string;
	title: string;
	description: string;
	reward?: number;
	link?: string;
};

export type QuestProgressEntry = {
	type: string;
	index?: number; // which one was completed
	altIndex?: number; // if it was an alternative step, which one
	completed: boolean;
};
