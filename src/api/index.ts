import { AuthInterceptor } from "@/api/interceptors/authInterceptor";

export const configureApi = () => {
	AuthInterceptor()
}

