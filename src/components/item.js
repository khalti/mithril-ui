import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";
import omit from "lodash/omit";

export const item = component({
  extend: base,
	getDefaultAttrs () {
		return {
			dom: {
				tagName: "a"
			}
		};
	},
	getClassList (attrs) {
		return ["item"];
	},
  view (vnode) {
		let attrs = vnode.attrs;
    return m(attrs.dom.tagName, omit(attrs.dom, ['tagName']), vnode.children);
  }
});
