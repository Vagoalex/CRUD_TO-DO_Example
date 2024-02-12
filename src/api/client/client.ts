import httpService from "@/api/client/httpService";
import { getHeaders } from "@/api/config/headers";
import axios from "axios";
import RequestCancelledException from "@/exceptions/requestCancelledException";
import HttpNotFoundException from "@/exceptions/httpNotFoundException";
import BadRequestException from "@/exceptions/badRequestException";
import AccessForbiddenException from "@/exceptions/accessForbiddenException";
import ServerUnavailableException from "@/exceptions/serverUnavailableException";
import OfflineException from "@/exceptions/offlineException";
import { processApiPayload } from "@/utils/api";
import AbortService from "@/services/abortService";

export const classifyError = (error: any, { url }: { url: string }) => {
	if(axios.isCancel(error)) {
		return new RequestCancelledException();
	}
	
	if(error.response) {
		const data: any = error.response.data;
		
		if(error.response.status === 400)
			return new BadRequestException(data.title, data.message);
		
		if(error.response.status === 404)
			return new HttpNotFoundException(data.message);
		
		if(error.response.status === 403)
			return new AccessForbiddenException(error.response.config.url);
		
		console.error("Error!", error.response.data);
		return error;
	} else {
		if(navigator.onLine) {
			return new ServerUnavailableException(url);
		} else {
			return new OfflineException(url);
		}
	}
};

export class Client {
	abortService: AbortService;
	
	constructor(abortService: AbortService) {
		this.abortService = abortService;
	}
	
	async get<T>(url: string, options?: object): Promise<T> {
		try {
			const dateBeforeRequest = Date.now();
			console.log(`Request from '${url}'`);
			
			let { data } = await httpService.get(`${url}`, {
				headers: getHeaders(),
				...options,
				signal: this.abortService.getSignal()
			});
			console.log(`Response from '${url}'`, `time: ${Date.now() - dateBeforeRequest}ms`, data);
			
			return data;
		} catch (error) {
			console.warn(error)
			throw classifyError(error, { url });
		}
	}
	
	async put<T>(url: string, payload: any, config?: any): Promise<T> {
		if(payload)
			processApiPayload(payload);
		
		try {
			console.log(`Request from '${url}'`, payload);
			
			let { data } = await httpService.put(url, payload, {
				headers: getHeaders(),
				...config,
				signal: this.abortService.getSignal()
			});
			
			console.log(`Response from '${url}'`, data);
			
			return data;
		} catch (error) {
			throw classifyError(error, { url });
		}
	}
	
	async post<T>(url: string, payload: any, config?: object): Promise<T> {
		if(payload)
			processApiPayload(payload);
		
		try {
			console.log(`Request from '${url}'`, payload);
			
			let { data } = await httpService.post(url, payload, {
				...config,
				signal: this.abortService.getSignal()
			});
			
			console.log(`Response from '${url}'`, data);
			
			return data;
		} catch (error) {
			throw classifyError(error, { url });
		}
	}
	
	async delete(url: string): Promise<any> {
		try {
			console.log(`Request from '${url}'`);
			
			let { data } = await httpService.delete(url, {
				headers: getHeaders(),
				signal: this.abortService.getSignal()
			});
			
			console.log(`Response from '${url}'`, data);
			
			return data;
		} catch (error) {
			throw classifyError(error, { url });
		}
	}
}
