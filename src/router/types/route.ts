﻿export default class Route {
	constructor(
		public name: string,
		public children: Route[] = []
	)
	{
	}
}
