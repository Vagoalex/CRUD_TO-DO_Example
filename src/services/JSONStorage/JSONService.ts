import NotDefinedException from "@/exceptions/notDefinedException";

export class JSONStorage {
	storage: Storage;
	
	constructor(storage: Storage | null | undefined) {
		if(!storage || typeof storage !== "object")
			throw new NotDefinedException(`Expected a Storage object, got ${storage}`);
		
		this.storage = storage;
	}
	
	set(k: string, v: any) {
		const str = JSON.stringify(v);
		
		if(typeof str === "undefined")
			return this.storage.removeItem(k);
		this.storage.setItem(k, str);
	}
	
	get(k: string) {
		const str = this.storage.getItem(k);
		// we return `undefined` instead of `null`, so that we can differentiate between the cases when the key doesn't exist vs when the value is a JSON-serialized `"null"`
		if(str === null) return;
		return JSON.parse(str);
	}
	
	remove(k: string) {
		this.storage.removeItem(k);
	}
}
