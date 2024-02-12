import { defineStore } from "pinia";
import { PageState, usePageStore } from "@/stores/composables/page/usePageStore";
import AbortService from "@/services/abortService";
import alertService, { AlertKeys } from "@/stores/shared/alerts/services/alertService";
import { TaskController } from "@/api/controllers/task";
import AlertHelper from "@/stores/shared/alerts/helpers/alertHelper";
import { RegisterState, useRegisterStore } from "@/stores/composables/register/useRegisterStore";
import TasksRouteQuery from "@/stores/tasks/types/tasksRouteQuery";
import { SortingOrderTypeEnum } from "@/types/SortingOrderTypeEnum";
import { TaskItem, TaskItemMapper } from "@/stores/tasks/types/taskItem";

const abortService = new AbortService();
const taskController = new TaskController(abortService);

export interface TasksState extends PageState, RegisterState<TaskItem> {
	selectedItemIds: string[];
	deleting: boolean;
}

const defaultRouteQuery = new TasksRouteQuery(
	1,
	"",
	SortingOrderTypeEnum.DESCENDING,
	""
);

const page = usePageStore(abortService);

const register = useRegisterStore<TaskItem>({
	routeQuery: defaultRouteQuery
});

const getDefaultState = (): TasksState => {
	return {
		...page.getDefaultPageState(),
		...register.getDefaultRegisterState(),
		selectedItemIds: [],
		deleting: false
	};
};

export const useTasksStore = defineStore({
	id: "tasks",
	state: (): TasksState => getDefaultState(),
	getters: {
		...page.getters,
		...register.getters
	},
	actions: {
		...page.actions,
		...register.actions,
		async beforeInitialized() {
			await this.initializeRegister();
		},
		async fetchRegisterItems() {
			const apiTasks = await taskController.getTasks();
			
			return { items: apiTasks.map(task => TaskItemMapper.map(task)) };
		},
		async deleteItems(ids?: string[]) {
			this.deleting = true;
			
			try {
				const idsToDelete: string[] = ids || this.selectedItemIds;
				console.warn(idsToDelete)
				await taskController.deleteTasks(idsToDelete);
				
				this.listing.items = this.listing.items.filter(x => !idsToDelete.includes(x.id));
				this.selectedItemIds = this.selectedItemIds.filter(x => !idsToDelete.includes(x));
				
				if(idsToDelete.length === 1)
					alertService.addInfo(AlertKeys.NOTES_SUCCESS_DELETED);
				else
					alertService.addInfo(AlertKeys.NOTE_SUCCESS_DELETED);
			} catch (error) {
				console.error(error);
				AlertHelper.handleGeneralRequestErrors(error);
			} finally {
				this.deleting = false;
			}
		}
	}
});
