<template>
	<v-container :fluid="true" class="pa-0">
		<v-row style="position: fixed; bottom: 0; left: 0; width: 100%" class="my-form-actions-layout bg-secondary-darken-1 ma-0 py-0 pr-3">
			<v-col class="d-flex justify-end mr-5">
				<slot></slot>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.my-form-actions-layout {
  border: 1px solid rgb(var(--v-theme-grey-darken-4)) !important;
}
</style>
