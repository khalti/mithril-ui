import {Base} from "./../base.js";
import _ from "mithril";


export class TFoot extends Base {
	getClassList ({attrs}) {
		return [
			attrs.fullWidth && "full-width"
		];
	}

	getDefaultAttrs ({attrs}) {
		return {root: "tfoot"};
	}
}


export const tfoot = new TFoot();
