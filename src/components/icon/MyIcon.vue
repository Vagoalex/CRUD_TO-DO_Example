<template>
	<div :style="styleObject" class="d-flex" @click="$emit('click')">
		<inline-svg :width="`${width}px`" :height="`${height}px`" :src="processedSrc"></inline-svg>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import InlineSvg from "vue-inline-svg";
import { TextFieldTypeEnum } from "@/components/fields/types/TextFieldTypeEnum";

interface MyIconProps {
	src: string;
	width: string | number;
	height: string | number;
	color?: string;
}

const props = withDefaults(defineProps<MyIconProps>(), {
	color: "#0000"
});

const styleObject = computed(() => ({ color: props.color, fill: props.color }));
const processedSrc = computed(() => `/img/icons/${props.src}.svg`);
</script>
