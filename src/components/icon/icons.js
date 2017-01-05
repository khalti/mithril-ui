import {Base} from "./../base.js";
import _ from "mithril";
import keys from "lodash/keys";
import {sizeMap} from "./../../helpers/enums.js";
import {required, within} from "validatex";


export class Icons extends Base {
	attrSchema = {
		size: [required(false), within(keys(sizeMap))]
	}

	getDefaultAttrs (vnode) {
		return {root: "i"};
	}

	getClassList (attrs) {
		return [
			attrs.size,
			"icons",
		];
	}

  view (vnode) {
		let attrs = vnode.attrs;

    return _(attrs.root, attrs.rootAttrs, vnode.children);
  }
}


export const icons = new Icons();
