import { JSONStorage } from "@/services/JSONStorage/JSONService";
import BadRequestException from "@/exceptions/badRequestException";
import NotDefinedException from "@/exceptions/notDefinedException";
import { MOCK_DB_TASKS } from "@/constants/mockDB";

const ls = new JSONStorage(localStorage);

export const mockTaskRepository = {
	deleteTasks(taskIds: string[]) {
		if(!taskIds.length)
			throw new NotDefinedException("taskIds");
		
		const mockDBTasks = ls.get(MOCK_DB_TASKS);
		
		if(!mockDBTasks)
			throw new BadRequestException("isDBEmpty", "База данных пуста, нечего удалять!");
		
		if(Array.isArray(mockDBTasks) && mockDBTasks.length) {
			console.warn(taskIds)
			console.warn(mockDBTasks)
			console.warn(mockDBTasks.filter((x: any) => !taskIds.includes(x.id)))
			
			ls.set(MOCK_DB_TASKS, mockDBTasks.filter((x: any) => !taskIds.includes(x.id)));
		}
	}
};
