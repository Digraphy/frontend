import { TopicDto } from "./topic";

export interface FactoidDto {
	id: number;
	description: string;
	topics: TopicDto[];
}
