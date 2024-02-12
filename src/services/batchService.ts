// @ts-ignore
import { v4 as generateGuid } from "uuid";

export default class BatchService {
	interval: number;
	_batch: string[]

	constructor({ interval }: { interval: number }) {
		this.interval = interval;
		this._batch = [];
	}


	push(callback: any) {
		let id = generateGuid();
		this._batch.push(id);
		setTimeout(() => {
			if(this._batch.length !== 0 && this._batch.indexOf(id) === this._batch.length - 1) {
				this._progress(callback);
			}
		}, this.interval);
	}

	_progress(callback: any) {
		this._batch = [];
		callback();
	}
}
