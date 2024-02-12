<template>
	<span :style="{ color }" class="text-caption">
		<slot></slot>
	</span>
</template>

<script setup lang="ts">
export interface MyTextCaptionProps {
	color?: string;
}

withDefaults(defineProps<MyTextCaptionProps>(), {
	color: "rgb(var(--v-theme-grey-darken-1))"
});
</script>
