import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";
import keys from "lodash/keys";
import {sizeMap} from "./../../helpers/enums.js";


export const icons = component({
	name: "icons",
	base: base,
	attrSchema: {
		size: [required(false), within(keys(sizeMap))]
	},
	getDefaultAttrs () {
		return {root: "i"};
	},
	getClassList (attrs) {
		return [
			attrs.size,
			"icons",
		];
	},
  view (vnode) {
		let attrs = vnode.attrs;

    return m(attrs.root, attrs.rootAttrs, vnode.children);
  }
});
