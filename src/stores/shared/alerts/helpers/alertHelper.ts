import OfflineException from "@/exceptions/offlineException";
import alertService, { AlertKeys } from "@/stores/shared/alerts/services/alertService";
import ServerUnavailableException from "@/exceptions/serverUnavailableException";
import RequestCancelledException from "@/exceptions/requestCancelledException";
import BadRequestException from "@/exceptions/badRequestException";
import HttpNotFoundException from "@/exceptions/httpNotFoundException";

export default class AlertHelper {
	static handleGeneralRequestErrors(error: Error) {
		switch (error.constructor) {
			case OfflineException:
				alertService.addError(AlertKeys.OFFLINE_REQUEST_ERROR);
				break;
			case ServerUnavailableException:
				alertService.addError(AlertKeys.SERVER_UNAVAILABLE_ERROR);
				break;
			case BadRequestException:
				alertService.addCustomError(error.message);
				break;
			case HttpNotFoundException:
				alertService.addCustomError(error.message);
				break;
			case RequestCancelledException:
				break;
			default:
				alertService.addError(AlertKeys.REQUEST_UNKNOWN_ERROR);
				break;
		}
	}
}
