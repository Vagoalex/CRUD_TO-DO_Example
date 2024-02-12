import { createWebHashHistory, createRouter } from "vue-router";
import MyHome from "@/views/home/MyHome.vue";
import { RouteNames } from "@/router/routeNames";
import { configureMiddleware } from "@/router/middleware";
import MyInternalServerError from "@/views/errors/MyInternalServerError.vue";
import MyAccessDeniedError from "@/views/errors/MyAccessDeniedError.vue";
import MyPageNotFoundError from "@/views/errors/MyPageNotFoundError.vue";
import MyLayout from "@/views/layouts/MyLayout.vue";
import MyEmptyLayout from "@/components/layouts/MyEmptyLayout.vue";
import MyTasks from "@/views/tasks/MyTasks.vue";

const routes = [
	{
		path: "/",
		component: MyLayout,
		name: RouteNames.ROOT,
		children: [
			{
				path: "tasks",
				name: RouteNames.TASKS,
				component: MyTasks
			}
		
		
		]
	},
	{
		path: "/",
		component: MyEmptyLayout,
		meta: { public: true },
		children: [
			{
				path: "internal-server-error",
				meta: { public: true },
				component: MyInternalServerError,
				name: RouteNames.ERROR_INTERNAL_SERVER_ERROR
			},
			{
				path: "access-denied",
				meta: { public: true },
				component: MyAccessDeniedError,
				name: RouteNames.ERROR_ACCESS_DENIED
			},
			{
				path: "/:pathMatch(.*)",
				meta: { public: true },
				component: MyPageNotFoundError,
				name: RouteNames.ERROR_PAGE_NOT_FOUND
			}
		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	//@ts-ignore
	routes,
	linkActiveClass: "active-link",
	linkExactActiveClass: "exact-active-link"
});

configureMiddleware(router);

export default router;
