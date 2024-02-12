import { defineStore } from "pinia";
import { PageModeType } from "@/stores/root/types/pageModeType";
import RequestCancelledException from "@/exceptions/requestCancelledException";

interface RootState {
	pageMode: PageModeType;
	appLoading: boolean;
}

const getDefaultState = (): RootState => {
	return {
		pageMode: PageModeType.OK,
		appLoading: true
	};
};

export const useRootStore = defineStore({
	id: "root",
	state: (): RootState => getDefaultState(),
	getters: {},
	actions: {
		setAppLoading(value: boolean) {
			this.appLoading = value;
		},
		setPageMode(value: PageModeType) {
			this.pageMode = value;
		},
		resetPageMode() {
			this.pageMode = PageModeType.OK;
		},
		setPageModeNotFound() {
			this.pageMode = PageModeType.PAGE_NOT_FOUND;
		},
		setPageModeAccessForbidden() {
			this.pageMode = PageModeType.ACCESS_DENIED;
		},
		handleInternalServerError(ex: Error) {
			if(ex.constructor === RequestCancelledException)
				return;

			this.pageMode = PageModeType.INTERNAL_SERVER_ERROR;
		},
	}
});
