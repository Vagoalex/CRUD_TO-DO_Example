<template>
	<v-chip-group class="my-chip-group"
				  :value="value"
				  @change="$emit('update:value', $event)"
				  mandatory
				  selected-class="text-success">
		<v-chip :outlined="outlined" v-for="tag in items" :key="tag" :value="tag">
			{{ alias ? $t(`aliases.${alias}.${items.find(x => x === tag)}`) : tag }}
		</v-chip>
	</v-chip-group>
</template>

<script>
export default {
	model: {
		prop: "value",
		event: "update:value"
	},
	props: {
		items: Array,
		value: [Number, String],
		alias: String,
		outlined: Boolean
	}
};
</script>
