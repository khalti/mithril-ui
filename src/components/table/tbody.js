import {Base} from "./../base.js";
import _ from "mithril";
import keys from "lodash/keys";


export class TBody extends Base {
	getDefaultAttrs ({attrs}) {
		return {root: "tbody"};
	}
}


export const tbody = new TBody();
