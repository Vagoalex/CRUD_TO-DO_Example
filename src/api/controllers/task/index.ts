import BaseController from "@/api/shared/baseController";
import urls from "@/api/config/urls";
import AbortService from "@/services/abortService";
import { JSONStorage } from "@/services/JSONStorage/JSONService";
import { delay } from "@/utils/delay";
import { ApiTask } from "@/api/types/task/apiTask";
import { mocks } from "@/api/client/mock";
import { MOCK_DB_TASKS } from "@/constants/mockDB";
import { mockTaskRepository } from "@/api/controllers/mockTaskRepository/mockTaskRepository";

const ls = new JSONStorage(localStorage);

export class TaskController extends BaseController {
	constructor(abortService: AbortService) {
		super(abortService);
	}
	
	getTasks = async (): Promise<ApiTask[]> => {
		await delay(2000);
		
		return mocks.firstInitTasks;
		// true endpoint
		// return await this.client.get<ApiTask[]>(urls.tasks.getTasks);
	};
	
	deleteTasks = async (taskIds: string[]): Promise<void> => {
		await delay(1500);
		
		return mockTaskRepository.deleteTasks(taskIds);
		
		// true endpoint
		// return await this.client.put(urls.tasks.deleteTasks, taskIds);
	};
}
