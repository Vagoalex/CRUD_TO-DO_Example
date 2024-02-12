import { defineStore } from "pinia";

export interface FormState {
	formStateLoading: boolean;
	formValid: boolean;
	formDisabled: boolean;
	formSaving: boolean;
	formReadonly: boolean;
}

export function useFormStore() {
	const getDefaultState = (): FormState => {
		return {
			formStateLoading: false,
			formValid: false,
			formDisabled: false,
			formSaving: false,
			formReadonly: false
		};
	};
	
	const getters = {};
	
	const actions = {};
	
	return {
		actions, getters,
		getDefaultPageState: getDefaultState
	};
}

let storeComposables: ReturnType<typeof useFormStore>;
export type FormStoreDefinition =
	ReturnType<typeof defineStore<string, FormState, typeof storeComposables.getters, typeof storeComposables.actions & {
		[key: string]: any
	}>> | any;
