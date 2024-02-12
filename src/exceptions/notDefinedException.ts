export default class NotDefinedException extends Error {
	private property: string;

	constructor(property: string) {
		super(`NotDefinedException: ${property} is not defined`);
		this.name = "NotDefinedException";
		this.property = property;
	}
}
