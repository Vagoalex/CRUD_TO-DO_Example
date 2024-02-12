<template>
	<div class="toast" :class="background">
		<div class="toast__body">
			<template v-if="icon">
				<div class="toast-icon">
					<my-icon :src="icon"
							 :color="icoColor"
							 width="30"
							 height="30">
					</my-icon>
				</div>
			</template>
			
			<span>{{ text }}</span>
		</div>
		
		<template v-if="isClosed">
			<my-icon v-if="icon"
					 src="ico-close"
					 width="30"
					 height="30"
					 @click="close"
					 class="cursor">
			</my-icon>
		</template>
	</div>
</template>

<script setup lang="ts">
import { watch, ref, computed, Ref } from "vue";
import MyIcon from "@/components/icon/MyIcon.vue";
import { AlertsType } from "@/types/alertsType";
import { useColors } from "@/composables/useColors";

const { colors } = useColors();

interface MyAlertsToastProps {
	type: AlertsType;
	text: string;
	timeout: number;
	icon: string;
	isClosed?: boolean;
}

const props = withDefaults(defineProps<MyAlertsToastProps>(), {
	isClosed: true
});

const emit = defineEmits(["close"]);
const close = () => emit("close");

const isShown = ref(true);

const background = computed(() => {
	return `toast__background--${props.type}`;
});

const icoColor = computed(() => {
	const map = new Map([
		[AlertsType.SUCCESS, colors.success],
		[AlertsType.ERROR, colors.error],
		[AlertsType.INFO, colors.info]
	]);
	
	return map.get(props.type);
});

if(props.timeout) setTimeout(close, props.timeout);


watch(() => isShown, (newValue: Ref<boolean>) => {
	if(!newValue) {
		close();
	}
});
</script>
<style scoped lang="scss">
.toast {
  padding: 20px;
  color: rgb(var(--v-theme-white));
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__body {
	display: flex;
	align-items: center;
  }

  &__background {
	&--error {
	  background: rgb(var(--v-theme-error));
	  //background:   #ff0000;
	}

	&--info {
	  background: rgb(var(--v-theme-info));
	  //background: #002aff;
	}

	&--success {
	  background: rgb(var(--v-theme-success));
	  //background: #66ff00;
	}
  }
}

.toast-icon {
  background: white;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin-right: 10px;
}
</style>
