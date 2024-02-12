import { defineStore } from "pinia";
import { v4 as generateId } from "uuid";
import Alert from "@/stores/shared/alerts/types/alert";

interface AlertsState {
	successAlerts: Alert[];
	errorAlerts: Alert[];
	infoAlerts: Alert[];
}

export const useAlertsStore = defineStore({
	id: "alerts",
	state: (): AlertsState => ({
		successAlerts: [],
		errorAlerts: [],
		infoAlerts: []
	}),
	getters: {},
	actions: {
		addSuccessAlert(value: string) {
			const id = generateId();
			this.successAlerts.push(new Alert({ text: value, timeout: 3000, id }));
		},
		removeSuccessAlert(index: number) {
			this.successAlerts.splice(index, 1);
		},
		addErrorAlert(value: string) {
			const id = generateId();
			this.errorAlerts.push(new Alert({ text: value, timeout: 7000, id }));
		},
		removeErrorAlert(id: string) {
			this.errorAlerts = this.errorAlerts.filter(x => x.id !== id);
		},
		addInfoAlert(value: string) {
			const id = generateId();
			this.infoAlerts.push(new Alert({ text: value, timeout: 7000, id }));
		},
		removeInfoAlert(id: string) {
			this.infoAlerts = this.infoAlerts.filter(x => x.id !== id);
		}
	}
});

