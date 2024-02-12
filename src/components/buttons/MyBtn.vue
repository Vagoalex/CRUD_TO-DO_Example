<template>
	<v-btn class="my-btn"
		   :color="color"
		   :loading="loading"
		   :width="width"
		   :disabled="disabled"
		   :class="{'my-btn--full-width': fullWidth}">
		<slot></slot>
	</v-btn>
</template>

<script setup lang="ts">

interface Props {
	disabled?: boolean;
	loading?: boolean;
	color?: string;
	width?: string | number;
	fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
	loading: false,
	color: "primary",
	width: undefined,
	fullWidth: false
});
</script>

<style scoped lang="less">
.my-btn {
	& + & {
		margin-left: 16px !important;
	}

	& + &.no-margin-btn {
		margin-left: 0 !important;
	}
}
</style>
