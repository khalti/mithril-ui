import {Base} from "./../base.js";
import _ from "mithril";
import keys from "lodash/keys";


export class THead extends Base {
	getClassList (attrs) {
		return [
			{"full-width": attrs.fullWidth}
		];
	}

	getDefaultAttrs ({attrs}) {
		return {root: "thead"};
	}
}


export const thead = new THead();
