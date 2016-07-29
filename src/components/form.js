import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";


export const from = component({
	base: base,
	getClassList (attrs) {
		return ["ui",
						"form"];
	},
  view (vnode) {
    return m("form", vnode.attrs.dom, vnode.children);
  }
});
