import { TopicDto } from "./topic";

export interface FactoidDto {
	id: number;
	description: string;
	topics: TopicDto[];
}

export const dummyFactoids: { [id: number]: FactoidDto } = {
	1: {
		id: 1,
		description: "Factoid 1",
		topics: [],
	},
	2: {
		id: 2,
		description: "Factoid 2",
		topics: [],
	},
	3: {
		id: 3,
		description: "Factoid 3",
		topics: [],
	},
	4: {
		id: 4,
		description: "Factoid 4",
		topics: [],
	},
	5: {
		id: 5,
		description: "Factoid 5",
		topics: [],
	},
};
