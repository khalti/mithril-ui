import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";
import omit from "lodash/omit";

export const icon = component({
	base: base,
	getDefaultAttrs () {
		return {dom: {tagName: "i"}};
	},
	getClassList (attrs) {
		return ["icon"];
	},
  view (vnode) {
		let attrs = vnode.attrs;

    return m(attrs.dom.tagName, omit(attrs.dom, ["tagName"]), vnode.children);
  }
});
