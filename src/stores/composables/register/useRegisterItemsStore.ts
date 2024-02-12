export interface RegisterItemsState<ItemType> {
	listing: {
		items: ItemType[];
		loading: boolean;
	};
}


export function useRegisterItemsStore() {
	const getters = {
		isListingEmpty(state: RegisterItemsState<any>) {
			if(!state.listing.items)
				return;
			
			return !state.listing.items.length;
		},
		filteredItems(state: RegisterItemsState<any>) {
			return state.listing.items;
		}
	};
	
	const actions = {
		setListingLoading(this: RegisterItemsState<any>, value: boolean) {
			this.listing.loading = value;
		},
		setListingItems(this: RegisterItemsState<any>, value: any[]) {
			this.listing.items = value;
		}
	};
	
	return { getters, actions };
}
