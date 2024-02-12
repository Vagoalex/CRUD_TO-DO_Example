export default class NotImplementedException extends Error {
	private property: string;

	constructor(property: string) {
		super(`NotImplementedException: ${property} is not implemented`);
		this.name = "NotImplementedException";
		this.property = property;
	}
}
