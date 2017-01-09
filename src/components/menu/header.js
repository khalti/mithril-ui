import {UI} from "./../base.js";


export class MenuHeader extends UI {
	getClassList (attrs) {
		return ["header"];
	}
}


export const menuHeader = new MenuHeader();
