<template>
	<v-text-field v-model="value"
				  :rules="[...defaultRules, ...rules]"
				  :label="label"
				  class="my-text-field"
				  :placeholder="placeholder"
				  :clearable="clearable"
				  :type="showPassword ? TextFieldTypeEnum.TEXT : TextFieldTypeEnum.PASSWORD">
		<template #append v-if="$slots.append">
			<slot name="append">
				<template v-if="passwordIcon">
					<v-icon v-if="showPassword"
							class="cursor"
							size="large"
							@click="showPassword = false"
							icon="mdi-eye">
					</v-icon>
					<v-icon v-else
							class="cursor"
							size="large"
							@click="showPassword = true"
							icon="mdi-eye-off">
					</v-icon>
				</template>
			</slot>
		</template>
	</v-text-field>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { requiredRule } from "@/utils/validation";
import { TextFieldTypeEnum } from "@/components/fields/types/TextFieldTypeEnum";

interface Props {
	modelValue: string | null;
	required?: boolean;
	rules?: Array<Function>;
	label?: string;
	placeholder?: string;
	clearable?: boolean;
	passwordIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: null,
	required: false,
	rules: () => [],
	label: undefined,
	placeholder: undefined,
	clearable: false,
	type: TextFieldTypeEnum.TEXT,
	passwordIcon: false
});
const emit = defineEmits(["update:modelValue"]);

const showPassword = ref<boolean>(true);

if(props.passwordIcon)
	showPassword.value = false;

const value = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit("update:modelValue", value);
	}
});

const defaultRules = computed(() => {
	if(props.required)
		return [requiredRule()];
	else
		return [];
});
</script>

<style scoped lang="scss">

</style>
