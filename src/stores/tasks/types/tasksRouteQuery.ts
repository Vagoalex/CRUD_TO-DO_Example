import { IsString, IsInt, Min, IsIn, Max, Length, IsArray } from "class-validator";
import { SortingOrderTypeEnum } from "@/types/SortingOrderTypeEnum";
import RegisterRouteQuery from "@/stores/composables/register/types/registerRouteQuery";

const AVAILABLE_SORTS = [
	""
];


export default class TasksRouteQuery implements RegisterRouteQuery {
	@IsInt()
	@Min(0)
	@Max(1000)
	page: number;
	
	@IsString()
	@IsIn(AVAILABLE_SORTS)
	sort: string;
	
	@IsString()
	@IsIn([SortingOrderTypeEnum.DESCENDING, SortingOrderTypeEnum.ASCENDING])
	sortDirection: string;
	
	@IsString()
	@Length(0, 100)
	query: string;
	
	constructor(
		page: number,
		sort: string,
		sortDirection: string,
		query: string
	)
	{
		this.page = page;
		this.sort = sort;
		this.sortDirection = sortDirection;
		this.query = query;
	}
}
