import RegisterRouteQuery from "@/stores/composables/register/types/registerRouteQuery";
import { RegisterItemsState, useRegisterItemsStore } from "@/stores/composables/register/useRegisterItemsStore";
import { defineStore, Store } from "pinia";
import AlertHelper from "@/stores/shared/alerts/helpers/alertHelper";
import { useRootStore } from "@/stores/root";

const items = useRegisterItemsStore();

export interface RegisterState<ItemType> extends RegisterItemsState<ItemType> {
}

export interface RegisterStoreOptions {
	routeQuery: RegisterRouteQuery,
	itemsKey?: string;
}

// TODO: поправить типы
export function useRegisterStore<ItemType>(options: RegisterStoreOptions) {
	type RegisterStore = Store<string, RegisterState<ItemType>, any, { [key: string]: any }>;
	
	const getDefaultState = (routeQuery: RegisterRouteQuery) => {
		return {
			listing: {
				items: [],
				loading: false
			},
			paging: {
				total: 0,
				page: routeQuery.page,
				pageSize: 25
			},
			sorting: {
				type: routeQuery.sort,
				order: routeQuery.sortDirection
			}
		};
	};
	
	const getters = {
		...items.getters
	};
	
	const actions = {
		...items.actions,
		async initializeRegister(this: RegisterStore) {
			await this.updateListingItems();
		},
		async updateListingItems(this: RegisterStore) {
			this.setListingLoading(true);
			
			try {
				let { [options.itemsKey || "items"]: items } = await this.fetchRegisterItems(this);
				
				this.setListingItems(items);
			} catch (ex) {
				console.error(ex);
				AlertHelper.handleGeneralRequestErrors(ex);
				
				const { handleInternalServerError } = useRootStore();
				handleInternalServerError(ex);
			} finally {
				this.setListingLoading(false);
			}
		}
	};
	
	function getDefaultRegisterState() {
		return getDefaultState(options.routeQuery);
	}
	
	return { getters, actions, getDefaultRegisterState };
}

let storeComposables: ReturnType<typeof useRegisterStore>;
export type RegisterStoreDefinition =
	ReturnType<typeof defineStore<string, RegisterState<any>, typeof storeComposables.getters, typeof storeComposables.actions & {
		[key: string]: any
	}>> | any;
