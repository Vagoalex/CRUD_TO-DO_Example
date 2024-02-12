import AbortService from "@/services/abortService";
import NotImplementedException from "@/exceptions/notImplementedException";
import { defineStore } from "pinia";

export interface PageState {
	initialized: boolean;
}

export function usePageStore(abortService: AbortService) {
	const getDefaultState = (): PageState => {
		return {
			initialized: false
		};
	};
	
	const getters = {
	};
	
	const actions = {
		async beforeInitialized(...args: any) {
			throw new NotImplementedException("beforeInitialized хук не был определен");
		},
		async initialize(...args: any) {
			abortService.initialize();
			
			await this.beforeInitialized(...args);
			
			// @ts-ignore
			this.initialized = true;
		},
		destroyBase() {
			abortService.abort();
		},
		destroy() {
			this.destroyBase();
			// @ts-ignore
			this.$reset();
		}
	};
	
	return {
		actions, getters,
		getDefaultPageState: getDefaultState
	};
}

let storeComposables: ReturnType<typeof usePageStore>;
export type PageStoreDefinition =
	ReturnType<typeof defineStore<string, PageState, typeof storeComposables.getters, typeof storeComposables.actions & { [key: string]: any }>> | any;
