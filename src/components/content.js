import {Base} from "./base.js";


export class Content extends Base {
	getClassList (attrs) {
		return ["content"];
	}
}

export const content = new Content();
