import { RouteLocationNormalized } from "vue-router";
import { RouteNames } from "@/router/routeNames";
import { Middleware } from "@/types/core/middleware";

export default class RedirectMiddleware implements Middleware {
	constructor() {
	}

	async invoke(to: RouteLocationNormalized, from: RouteLocationNormalized) {
		try {
			if(to.name === RouteNames.ROOT) {
				return { name: RouteNames.TASKS };
			}
		} catch (e) {
			console.error(e);
		}
	}
}
