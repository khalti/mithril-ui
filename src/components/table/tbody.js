import {Base} from "./../base.js";
import _ from "mithril";


export class TBody extends Base {
	getDefaultAttrs ({attrs}) {
		return {root: "tbody"};
	}
}


export const tbody = new TBody();
