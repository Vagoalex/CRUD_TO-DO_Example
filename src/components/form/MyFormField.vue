<template>
	<v-col :cols="cols" class="my-form-field">
		<slot></slot>
	</v-col>
</template>

<script setup lang="ts">

interface Props {
	cols?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
	cols: undefined
});
</script>

<style scoped lang="scss">
.my-form-field {
}
</style>
