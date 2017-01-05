import {Base} from "./../base.js";
import _ from "mithril";
import keys from "lodash/keys";


export class TFoot extends Base {
	getClassList (attrs) {
		return [
			{"full-width": attrs.fullWidth}
		];
	}

	getDefaultAttrs ({attrs}) {
		return {root: "tfoot"};
	}
}


export const tfoot = new TFoot();
