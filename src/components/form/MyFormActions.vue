<template>
	<my-form-actions-layout>
		<v-col class="d-flex justify-end mr-5">
			<my-btn data-cy="cancel"
					color="primary"
					outlined
					@click="dialogEnabled = true"
					:disabled="isCancelDisabled || isLoadingState">
				{{ t("buttons.cancel") }}
			</my-btn>
			
			<slot name="submit-action">
				<my-btn data-cy="submit"
						color="secondary"
						elevation="0"
						@click="onFormSubmit"
						:loading="isLoadingState"
						:disabled="isSaveDisabled || isLoadingState">
					{{ submitText || t("buttons.save") }}
				</my-btn>
			</slot>
			
			<my-confirm-dialog v-if="dialogEnabled"
							   @submit="onCancelFormSubmit"
							   @cancel="dialogEnabled = false"
							   :title="t('dialogs.confirmCancelFormChanges.title')"
							   :description="t('dialogs.confirmCancelFormChanges.description')">
			</my-confirm-dialog>
		</v-col>
	</my-form-actions-layout>
</template>

<script setup lang="ts">
import MyBtn from "@/components/buttons/MyBtn.vue";
import MyConfirmDialog from "@/components/dialogs/MyConfirmDialog.vue";
import MyFormActionsLayout from "@/components/layouts/MyFormActionsLayout.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface MyFormActionsProps {
	isLoadingState?: boolean;
	isCancelDisabled?: boolean;
	isSaveDisabled?: boolean;
	submitText?: string;
}

defineProps<MyFormActionsProps>();

const emit = defineEmits(["submit", "cancel"]);

const dialogEnabled = ref<boolean>(false);

const onFormSubmit = () => {
	emit("submit");
};
const onCancelFormSubmit = () => {
	dialogEnabled.value = false;
	emit("cancel");
};
</script>
