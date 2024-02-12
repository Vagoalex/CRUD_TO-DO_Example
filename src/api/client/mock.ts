import { ApiTask } from "@/api/types/task/apiTask";

export const mocks = {
	firstInitTasks: [
		{
			id: "firstInitTaskId_list",
			text: "Сделать список",
			completed: true
		},
		{
			id: "firstInitTaskId_detail",
			text: "Сделать отдельную карточку таски",
			completed: true
		},
		{
			id: "firstInitTaskId_create",
			text: "Сделать добавление новой таски",
			completed: true
		},
		{
			id: "firstInitTaskId_update",
			text: "Сделать изменение новой таски",
			completed: true
		},
		{
			id: "firstInitTaskId_pagination",
			text: "Сделать серверную пагинацию",
			completed: false
		},
		{
			id: "firstInitTaskId_search",
			text: "Сделать серверный поиск по названию таски",
			completed: false
		},
		{
			id: "firstInitTaskId_server-sort",
			text: "Сделать серверную сортировку",
			completed: false
		}
	] as ApiTask[]
};
