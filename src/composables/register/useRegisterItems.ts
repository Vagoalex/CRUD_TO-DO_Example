import { storeToRefs } from "pinia";
import { isNil, isString } from "lodash";
import { RegisterStoreDefinition } from "@/stores/composables/register/useRegisterStore";
import { useI18n } from "vue-i18n";

interface TableHeader {
	key: string;
	sortable?: boolean;
	width?: string;
	title?: string;
}

export interface RegisterItemsOptions {
	useStore: RegisterStoreDefinition;
	headers: string[] | TableHeader[];
}

const createTableHeaders = (items: string[] | TableHeader[]) => {
	const { t } = useI18n();
	
	return items.map(x => {
		if(isString(x))
			return {
				title: t(`tables.${x}`), key: x
			};
		else return {
			...x,
			title: !isNil(x.title) ? x.title : t(`tables.${x.key}`)
		};
	});
};

export function useRegisterItems(options: RegisterItemsOptions) {
	const store = options.useStore();
	const { listing, filteredItems, isListingEmpty } = storeToRefs(store);
	
	const TABLE_MOBILE_BREAKPOINT = 880;
	
	const headers = createTableHeaders(options.headers);
	
	return {
		listing, isListingEmpty, headers, TABLE_MOBILE_BREAKPOINT, filteredItems
	};
}
