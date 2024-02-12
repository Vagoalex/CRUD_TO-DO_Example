<template>
	<v-dialog :model-value="true" :persistent="true" width="512">
		<v-card>
			<v-card-title class="headline">{{ title }}</v-card-title>
			<v-card-text class="text-justify">{{ description }}</v-card-text>
			<v-card-actions class="pa-6">
				<v-spacer></v-spacer>
				<my-btn color="primary"
						outlined
						@click="cancel">
					{{ cancelBtn || t("buttons.back") }}
				</my-btn>
				<my-btn :color="submitBtnColor" :dark="submitBtnDark" @click="submit">
					{{ submitBtn || t("buttons.ok") }}
				</my-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import MyBtn from "@/components/buttons/MyBtn.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface MyConfirmDialogProps {
	title: string;
	description: string;
	cancelBtn?: string;
	submitBtn?: string;
	submitBtnColor?: string;
	submitBtnDark?: boolean;
}


withDefaults(defineProps<MyConfirmDialogProps>(), {
	submitBtnColor: "secondary",
	submitBtnDark: false
});

const emit = defineEmits(["submit", "cancel"]);

const submit = () => {
	emit("submit");
};
const cancel = () => {
	emit("cancel");
};
</script>

<style scoped>
