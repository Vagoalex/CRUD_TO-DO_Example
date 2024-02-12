<template>
	<my-list-layout v-if="listing.loading || listing.items.length">
		<template #title>
			{{ t("titles.tasks") }}
		</template>
		
		<!--		<template #search>-->
		<!--			search in future-->
		<!--		</template>-->
		
		<template #filter>
			<my-chip-group alias="filterTasksStatus"
						   v-model="filter.status"
						   :items="Object.values(TasksFilterStatusEnum)">
			</my-chip-group>
		</template>
		
		<template #content>
			<v-data-table :headers="headers"
						  :items="filteredItems"
						  :loading-text="t('tables.loading')"
						  hide-default-footer
						  :loading="listing.loading"
						  item-key="id"
						  :mobile-breakpoint="TABLE_MOBILE_BREAKPOINT"
						  :items-per-page="-1"
						  must-sort
						  @click:row="handleItemSelect"
						  v-model="selectedItemIds"
						  item-value="id"
						  show-select
						  :item-class="() => 'text-body-2'"
						  class="my-table colored-table-dark clickable-rows">
				<template #item.completed="{ item }">
					<my-task-status-label :value="item.completed"></my-task-status-label>
				</template>
				
				<template #item.delete="{ item }">
					<my-btn icon small @click="handleOpenDeleteItemDialog(item.id)">
						<v-icon color="secondary">mdi mdi-delete-forever</v-icon>
					</my-btn>
				</template>
			</v-data-table>
			
			<my-form-actions-layout>
				<my-btn v-if="selectedItemIds.length"
						elevation="0"
						color="error"
						dark
						:loading="deleting"
						@click="handleOpenDeleteItemDialog">
					{{ t("buttons.delete") }}
				</my-btn>
				
				<my-btn v-else
						elevation="0"
						color="primary"
						dark
						@click="handleAddItem">
					{{ t("buttons.add") }}
				</my-btn>
			</my-form-actions-layout>
			
			<my-delete-item-dialog v-model="deleteItemsDialogOpened"
								   @submit="handleDeleteItems"
								   @cancel="cancelDeleteItems"
								   :multiple="!isNil(idItemToDelete)"
								   :deleting="deleting">
			</my-delete-item-dialog>
		</template>
	
	</my-list-layout>
	<my-empty-items-alert v-else
						  :title="t('titles.tasks')"
						  :text="t('content.noTasks')"
						  button-text="Вы можете создать новую задачу"
						  @click="handleAddItem">
	</my-empty-items-alert>
</template>

<script setup lang="ts">
import { usePage } from "@/composables/usePage";
import { useColors } from "@/composables/useColors";
import MyListLayout from "@/components/layouts/MyListLayout.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { computed, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import MyBtn from "@/components/buttons/MyBtn.vue";
import { useTasksStore } from "@/stores/tasks";
import { useRegisterItems } from "@/composables/register/useRegisterItems";
import MyDeleteItemDialog from "@/components/dialogs/MyDeleteItemDialog.vue";
import { TaskItem } from "@/stores/tasks/types/taskItem";
import MyFormActionsLayout from "@/components/layouts/MyFormActionsLayout.vue";
import MyTaskStatusLabel from "@/components/labels/MyTaskStatusLabel.vue";
import { TasksFilterStatusEnum } from "@/stores/tasks/types/TasksFilterStatusEnum";
import MyChipGroup from "@/components/buttons/MyChipGroup.vue";
import MyEmptyItemsAlert from "@/components/alerts/MyEmptyItemsAlert.vue";
import { isNil } from "lodash";

const { t } = useI18n();

const router = useRouter();

const { colors } = useColors();
const useStore = useTasksStore;
const store = useStore();

const { deleteItems } = store;

const { selectedItemIds, deleting } = storeToRefs(store);

const deleteItemsDialogOpened = ref<boolean>(false);
const idItemToDelete = ref<null | string>(null);

const filter = reactive({
	status: TasksFilterStatusEnum.ALL
});

const filteredItems = computed(() => {
	switch (filter.status) {
		case TasksFilterStatusEnum.ALL:
		{
			return listing.value.items;
		}
		case TasksFilterStatusEnum.DONE:
		{
			return listing.value.items.filter((x: TaskItem) => x.completed);
		}
		case TasksFilterStatusEnum.NOT_DONE:
		{
			return listing.value.items.filter((x: TaskItem) => !x.completed);
		}
	}
});

const handleItemSelect = async (e: Event, { item }: { item: TaskItem }) => {
	return;
	//TODO
	// return await router.push({ name: RouteNamesEnum.SHOW_DETAILS, params: { id: item.id } });
};

const handleAddItem = async () => {
	return;
	//TODO
	// return await router.push({ name: RouteNamesEnum.SHOW_CREATE });
};

const handleOpenDeleteItemDialog = async (id?: string) => {
	// TODO: починить удаление
	console.warn(id);
	// if(item?.value)
	// 	idItemToDelete.value = item.value;
	//
	// deleteItemsDialogOpened.value = true;
};

const cancelDeleteItems = () => {
	deleteItemsDialogOpened.value = false;
	
	idItemToDelete.value = null;
};

const handleDeleteItems = async () => {
	console.warn(idItemToDelete.value);
	
	if(idItemToDelete.value) {
		// Пришлось пока что, время пол 12 ночи, Карл...
		//@ts-ignore
		await deleteItems([idItemToDelete as string]);
	} else {
		await deleteItems();
	}
	
	cancelDeleteItems();
};

const {
	listing, isListingEmpty, TABLE_MOBILE_BREAKPOINT, headers
} = useRegisterItems({
	useStore,
	headers: [
		...[
			"text",
			"completed"
		].map(key => ({ title: t(`tables.tasks.${key}`), key })),
		{
			title: "",
			key: "delete",
			sortable: false,
			width: "1%"
		}
	]
});

usePage({ useStore });
</script>
