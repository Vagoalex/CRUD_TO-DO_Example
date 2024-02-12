<template>
	<div class="my-status-label py-2 px-5" :style="`background-color: ${backgroundColor}0D`">
		<my-text-caption :color="textColor">{{ t(`aliases.taskStatus.${status}`) }}</my-text-caption>
	</div>
</template>

<script setup lang="ts">
import MyTextCaption from "@/components/typography/MyTextCaption.vue";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useColors } from "@/composables/useColors";

const { t } = useI18n();
const { colors } = useColors();

interface MyBtnLoaderProps {
	value: boolean;
}

const props = withDefaults(defineProps<MyBtnLoaderProps>(), {
	value: true
});

const status = computed(() => {
	return props.value ? "done" : "notDone";
});

const backgroundColor = computed(() => {
	return props.value ? colors.success : colors.error;
});

const textColor = computed(() => {
	return props.value ? colors.success : colors.error;
});
</script>
