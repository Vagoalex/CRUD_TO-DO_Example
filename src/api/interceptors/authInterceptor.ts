import httpService from "@/api/client/httpService";
import { SecurityService } from "@/services/securityService";

// const securityService = new SecurityService();

export const AuthInterceptor = () => {
	httpService.interceptors.request.use(async (config: any) => {
		try {
			// если появится токен, то сюда его нужно всунуть
			// let token = await securityService.getToken();
			
			// config.headers.Authorization = `Bearer ${token}`;
			return config;
		} catch (e) {
			console.error(e);
			throw e;
		}
	}, (error) => {
		return Promise.reject(error);
	});
	
	httpService.interceptors.response.use(async (response: any) => {
		return response;
	}, (error) => {
		return Promise.reject(error);
	});
};
