<template>
	<v-dialog ref="dialog"
			  :persistent="persistent"
			  :value="value"
			  @input="$emit('update:value', $event)"
			  @keydown.esc="$emit('dialog:close')"
			  :max-width="maxWidth"
			  content-class="overflow-hidden"
			  style="z-index: 2000">
		<template v-slot:activator="{ on, attrs }">
			<slot name="activator" :on="on" :attrs="attrs"></slot>
		</template>
		
		<v-card class="d-flex align-start flex-wrap overflow-hidden" elevation="0">
			<v-container ref="dialogCard" fluid class="px-6 py-0 overflow-y-auto my-scrollbar">
				<v-row class="my-0 white px-3 d-flex align-center" style="position: sticky; top: 0; z-index: 100">
					<v-col class="px-0">
						<p class="text-h6 blue--text text--darken-4 mt-3 d-flex"
						   :class="titleCenter ? 'justify-center' : 'justify-space-between'">
							<slot name="title">
								{{ title }}
							</slot>
						</p>
					</v-col>
					<slot name="close"></slot>
				</v-row>
				
				<v-row class="my-0">
					<v-col class="py-0">
						<slot name="content"></slot>
					</v-col>
				</v-row>
				
				<v-row class="my-0 white" style="position: sticky; bottom: 0">
					<v-col>
						<v-responsive content-class="d-flex justify-end py-3">
							<slot name="footer"></slot>
						</v-responsive>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>

export default {
	model: {
		prop: "value",
		event: "update:value"
	},
	props: {
		value: Boolean,
		title: String,
		titleCenter: {
			type: Boolean,
			default: false
		},
		persistent: Boolean,
		maxWidth: {
			default: 640
		}
	}
};
</script>
