import {Base} from "./base.js";

export class Meta extends Base {
	getClassList (attrs) {
		return ["meta"];
	}
}


export const meta = new Meta();
