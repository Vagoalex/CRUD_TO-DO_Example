﻿<template>
	<div class="toast-wrapper" :class="props.right ? 'toast-wrapper--right' : 'toast-wrapper--default'">
		<my-alerts-toast :text="successAlert.text"
						 @close="alertsStore.removeErrorAlert(successAlert.id)"
						 :type="AlertsType.SUCCESS"
						 icon="ico-error"
						 :data-cy="`${AlertsType.SUCCESS}-alert`"
						 :timeout="successAlert.timeout"
						 v-for="(successAlert) in successAlerts"
						 :key="successAlert.id"
						 class="success-toasts">
		</my-alerts-toast>
		<my-alerts-toast :text="errorAlert.text"
						 @close="alertsStore.removeErrorAlert(errorAlert.id)"
						 :type="AlertsType.ERROR"
						 icon="ico-error"
						 :data-cy="`${AlertsType.ERROR}-alert`"
						 :timeout="errorAlert.timeout"
						 v-for="(errorAlert) in errorAlerts"
						 :key="errorAlert.id"
						 class="error-toasts">
		</my-alerts-toast>
		<my-alerts-toast :text="infoAlert.text"
						 @close="alertsStore.removeInfoAlert(infoAlert.id)"
						 :type="AlertsType.INFO"
						 icon="ico-info"
						 :data-cy="`${AlertsType.INFO}-alert`"
						 :timeout="infoAlert.timeout"
						 v-for="(infoAlert, index) in infoAlerts"
						 :key="infoAlert.id"
						 class="info-toasts">
		</my-alerts-toast>
	</div>
</template>

<script setup lang="ts">

import MyAlertsToast from "@/components/alerts/MyAlertsToast.vue";
import { useAlertsStore } from "@/stores/shared/alerts";
import { storeToRefs } from "pinia";
import { AlertsType } from "@/types/alertsType";

const props = defineProps({
	right: {
		type: Boolean,
		default: false
	}
});
const alertsStore = useAlertsStore();
const {
	errorAlerts,
	infoAlerts,
	successAlerts
} = storeToRefs(alertsStore);

</script>
<style scoped lang="scss">
.toast-wrapper {
  z-index: 10000;
  position: fixed;
  bottom: 20px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &--default {
	width: 100%;
  }

  &--right {
	right: 0;
  }
}

.error-toasts, .info-toasts {
  display: none;

  &:last-child {
	display: flex;
  }
}
</style>
