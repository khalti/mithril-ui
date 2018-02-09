import {UI} from "./../base.js";
import _ from "mithril";


export class TFoot extends UI {
	getClassList ({attrs}) {
		return [
			attrs.fullWidth && "full-width"
		];
	}

	getDefaultAttrs ({attrs}) {
		return {root: "tfoot"};
	}
}
