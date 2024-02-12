﻿
<template>
	<v-container fluid class="d-flex flex-column justify-center flex-grow-1">
		<v-row class="flex-grow-0" v-if="title">
			<v-col>
				<span class="text-h1 text-secondary">{{ title }}</span>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="d-flex flex-column justify-center">
				<v-row class="flex-grow-0">
					<v-col class="d-flex justify-center pa-0">
						<v-icon color="secondary" size="80">mdi mdi-alpha-x-circle-outline</v-icon>
					</v-col>
				</v-row>
				<v-row class="flex-grow-0">
					<v-col class="d-flex justify-center pa-0">
						<span class="text-secondary text-h4 mt-5">{{ text }}</span>
					</v-col>
				</v-row>
				<v-row class="flex-grow-0">
					<v-col class="d-flex justify-center pa-0" style="position: relative">
						<my-btn v-if="buttonText"
								style="max-width: 430px"
								class="mt-5 flex-grow-1"
								@click="emit('click')">
							{{ buttonText }}
						</my-btn>
						
						<slot name="append"></slot>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import MyBtn from "@/components/buttons/MyBtn.vue";

interface Props {
	text: string;
	title?: string;
	buttonText?: string;
}

const emit = defineEmits(["click"]);

defineProps<Props>();
</script>
