import { ApiTask } from "@/api/types/task/apiTask";

export interface TaskItem {
	id: string;
	text: string;
	completed: boolean;
}

export class TaskItemMapper {
	static map(source: ApiTask): TaskItem {
		return {
			...source
		};
	}
}
