import {Base} from "./base.js";


export class Content extends Base {
	getClassList: function (attrs) {
		return ["content"];
	}
}

export const content = new Content();
