export default class NotDefinedOrNullException extends Error {
	constructor(property: string) {
		super(`NotDefinedOrNullException: ${property} is not defined or null`);
		this.name = "NotDefinedOrNullException";
	}
}
