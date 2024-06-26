﻿import { NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router";
import Middleware from "@/router/middleware/middleware";
import RedirectMiddleware from "@/router/middleware/items/redirectMiddleware";
import { useRootStore } from "@/stores/root";

export const configureMiddleware = (router: Router) => {
	router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
		const rootStore = useRootStore();
		
		const middleware = new Middleware(to, from, next);
		const publicRoute = to.matched.some(record => record.meta.public);
		
		if(!publicRoute) {
			middleware.useMiddleware(RedirectMiddleware);
		}
		await middleware.run();
		
		//TODO: убрать timeout, как придет время и как будет готова аутентификация
		setTimeout(() => {
			rootStore.setAppLoading(false);
		}, 700);
	});
};
