<template>
	<my-dialog v-model="modelValue" :title="titleTextValue">
		<template #content>
			<span class="primary--text text-body-2">
				{{ subtitleTextValue }}
			</span>
		</template>
		
		<template #footer>
			<my-btn outlined
					@click="emit('cancel')"
					:disabled="deleting"
					color="primary">
				{{ t("buttons.cancel") }}
			</my-btn>
			<my-btn elevation="0"
					color="secondary"
					dark
					:loading="deleting"
					@click="emit('submit')">
				{{ buttonTextValue }}
			</my-btn>
		</template>
	</my-dialog>
</template>

<script setup lang="ts">
import MyBtn from "@/components/buttons/MyBtn.vue";
import MyDialog from "@/components/dialogs/MyDialog.vue";
import { useI18n } from "vue-i18n";
import { i18n } from "@/plugins/i18n";
import { computed } from "vue";

const emit = defineEmits(["submit", "cancel"]);

const { t } = useI18n();

interface Props {
	modelValue: boolean;
	deleting: boolean;
	title?: string;
	subtitle?: string;
	multiple?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
	loading: false,
	multiple: false
});

const modelValue = computed(() => {
	return props.modelValue;
});

const titleTextValue = computed(() => {
	if(props.title) return props.title;
	
	if(props.multiple)
		return t("dialogs.deleteSelectedNotes.title");
	else
		return t("dialogs.deleteNote.title");
});

const subtitleTextValue = computed(() => {
	if(props.subtitle) return props.subtitle;
	
	if(props.multiple)
		return t("dialogs.deleteSelectedNotes.warning");
	else
		return t("dialogs.deleteNote.warning");
});

const buttonTextValue = computed(() => {
	if(props.multiple)
		return t("buttons.deleteSelectedNotes");
	else
		return t("buttons.deleteNote");
});
</script>

<style scoped>

</style>
