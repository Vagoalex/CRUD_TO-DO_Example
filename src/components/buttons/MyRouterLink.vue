<template>
	<router-link :to="to" class="my-router-link"
				 active-class="active-link"
				 exact-active-class="exact-active-link">
		<slot></slot>
	</router-link>
</template>

<script setup lang="ts">

defineProps({
	to: Object
});
</script>

<style scoped lang="scss">
@import "@styles/options/variables";

.my-router-link {
	color: rgb(var(--v-theme-white)) !important;
	transition: all 0.6ms ease;
}

.exact-active-link {
	color: rgb(var(--v-theme-primary)) !important;
	font-weight: bold;
	text-decoration: underline;
	transition: all 0.6ms ease;

	&:hover {
		color: rgb(var(--v-theme-primary-lighten-1)) !important;
	}
	
	&:active {
		color: rgb(var(--v-theme-primary-darken-1)) !important;
	}
}
</style>
