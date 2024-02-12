import { PageState, PageStoreDefinition } from "@/stores/composables/page/usePageStore";
import { StoreDefinition, storeToRefs } from "pinia";
import { computed, nextTick, onBeforeMount, onBeforeUnmount } from "vue";

export interface PageOptions {
	useStore: PageStoreDefinition;
	initializationArguments?: any;
}

export function usePage(options: PageOptions) {
	const store = options.useStore();
	
	const { initialized } = storeToRefs(store);
	
	onBeforeUnmount(() => {
		store.destroy();
	});
	
	onBeforeMount(async () => {
		await nextTick();
		await store.initialize(options.initializationArguments);
	});
	
	const loading = computed(() => !initialized.value);
	
	return { loading, initialized };
}
