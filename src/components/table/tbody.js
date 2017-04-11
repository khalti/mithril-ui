import {UI} from "./../base.js";
import _ from "mithril";


export class TBody extends UI {
	getDefaultAttrs ({attrs}) {
		return {root: "tbody"};
	}
}
