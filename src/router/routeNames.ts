import TreeModel from "tree-model";
import Route from "@/router/types/route";

export enum RouteNames {
	ROOT = "ROOT",
	
	TASKS = "TASKS",
	
	ERROR_INTERNAL_SERVER_ERROR = "ERROR_INTERNAL_SERVER_ERROR",
	ERROR_ACCESS_DENIED = "ERROR_ACCESS_DENIED",
	ERROR_PAGE_NOT_FOUND = "ERROR_PAGE_NOT_FOUND"
}

const tree = new TreeModel();


export const findRoute = (routeName: string, route = routesTreeRoot) => {
	return route.first(x => x.model.name === routeName);
};

export const findAllByAncestor = (ancestorRouteName: string) => {
	let searchNode: any = findRoute(ancestorRouteName);
	return routesTreeRoot.all(x => x.getPath().includes(searchNode));
};

export const routesTreeRoot = tree.parse<Route>(
	new Route(RouteNames.ROOT, [
			new Route(RouteNames.TASKS),
			
			// new Route(RouteNames.AUTH, [
			// 	new Route(RouteNames.AUTH_LOGIN),
			// 	new Route(RouteNames.AUTH_REGISTER)
			// ])
		]
	)
);
