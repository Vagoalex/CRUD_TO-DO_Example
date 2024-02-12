<template>
	<my-app-spinner-loader v-if="appLoading"></my-app-spinner-loader>
	<router-view v-else/>
</template>

<script setup lang="ts">
import { useRootStore } from "@/stores/root";
import MyAppSpinnerLoader from "@/components/loaders/common/MyAppSpinnerLoader.vue";
import { storeToRefs } from "pinia";

const rootStore = useRootStore();
const { appLoading } = storeToRefs(rootStore);
</script>
