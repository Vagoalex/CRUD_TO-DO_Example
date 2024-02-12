<template>
	<v-container :fluid="true" :class="{ 'px-0 pt-0': nested }">
		<v-row v-if="slots.title || slots.search || slots.filter || slots['side-btn']">
			<v-col align-self="center">
				<span class="text-h3 text-secondary">
					<slot name="title"></slot>
				</span>
			</v-col>
			<v-col cols="12" sm="4">
				<slot name="search"></slot>
			</v-col>
			<template v-if="slots.filter || slots['side-btn']">
				<v-col cols="12" sm="8" class="d-flex px-sm-3 pt-0 pt-sm-3 pr-0">
					<slot name="filter"></slot>
					<v-spacer v-if="smAndUp"></v-spacer>
					<slot name="side-btn"></slot>
				</v-col>
			</template>
		</v-row>
		<v-row :class="nested ? 'mt-0' : 'mt-2'">
			<v-col :class="{ 'pt-0': nested }">
				<slot name="content"></slot>
			</v-col>
		</v-row>
		<v-row class="mt-1">
			<v-col class="d-flex justify-end">
				<slot name="pagination"></slot>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { useSlots } from "vue";
import { useDisplay } from "vuetify";

interface MyListLayoutProps {
	nested?: boolean;
}

defineProps<MyListLayoutProps>();

const slots = useSlots();
const { smAndUp } = useDisplay();
</script>
