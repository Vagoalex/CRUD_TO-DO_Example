import { RouteLocationNormalized, RouteLocationRaw } from "vue-router";

export interface Middleware {
	invoke: (to: RouteLocationNormalized, from: RouteLocationNormalized) => Promise<void | RouteLocationRaw>;
}
