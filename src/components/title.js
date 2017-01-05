import {Base} from "./base.js";


export class Title extends Base {
	getClassList (attrs) {
		return [
			"title"
		];
	}
}


export const title = new Title();
