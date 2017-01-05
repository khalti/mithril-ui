import {Base} from "./../base.js";


export class MenuHeader extends Base {
	getClassList (attrs) {
		return ["header"];
	}
}


export const menuHeader = new MenuHeader();
