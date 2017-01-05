import {Base} from "./base.js";

export class Label extends Base {
	getClassList (attrs) {
		return [
			"ui",
			"label"
		];
	}
}


export const label = new Label();
