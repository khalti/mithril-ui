import {UI} from "./../base.js";
import _ from "mithril";


export class THead extends UI {
	getClassList ({attrs}) {
		return [
			attrs.fullWidth && "full-width"
		];
	}

	getDefaultAttrs ({attrs}) {
		return {root: "thead"};
	}
}


export const thead = new THead();
