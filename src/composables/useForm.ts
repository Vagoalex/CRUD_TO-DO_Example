import { FormStoreDefinition } from "@/stores/composables/form/useFormStore";
import { storeToRefs } from "pinia";
import { computed, nextTick, ref } from "vue";
import { useRoute } from "vue-router";
import { SavingTypeEnum } from "@/types/SavingTypeEnum";

export interface PageOptions {
	useStore: FormStoreDefinition;
}

export function useForm(options: PageOptions, isResetValidationDisabled: boolean = false) {
	const store = options.useStore();
	
	const {
		formStateLoading,
		formValid,
		formDisabled,
		formSaving,
		formReadonly
	} = storeToRefs(store);
	
	const form = ref<any>(null);
	
	const route = useRoute();
	
	const creationMode = computed(() => {
		return !route.params.id
	})
	
	const validateForm = () => {
		return form.value.validate();
	};
	
	const onFormCancel = async () => {
		await cancelFormChanges();
		await nextTick(() => {
			if(!isResetValidationDisabled)
				form.value.resetValidation();
		});
	};
	
	const cancelFormChanges = async () => {
		await store.cancelChanges();
	};
	
	const submit = async () => {
		if(validateForm()) {
			creationMode ?
				await store.save({ type: SavingTypeEnum.CREATE }) :
				await store.save({ type: SavingTypeEnum.UPDATE, id: route.params.id });
		}
	};
	
	return {
		form,
		formStateLoading,
		formValid,
		formDisabled,
		formSaving,
		formReadonly,
		creationMode,
		validateForm,
		onFormCancel,
		cancelFormChanges,
		submit
	};
}
