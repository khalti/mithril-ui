import {Base} from "./base.js";


export class Description extends Base {
	getClassList (attrs) {
		return ["description"];
	}
}


export const description = new Description();
