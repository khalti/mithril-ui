import m from 'mithril';
import component from "mithril-componentx";
import {base} from "./base.js";
import omit from "lodash/omit";

export const input = component({
	base: base,
	attrSchema: {type: {presence: true}},
	getClassList (attrs) {
		return ["ui",
						{left: attrs.prepend && attrs.prepend.tag === "i"},
						{icon: (attrs.prepend && attrs.prepend.tag == "i") || (attrs.append && attrs.append.tag === "i")},
						{right: attrs.append && attrs.append.tag !== "i"},
						{labeled: (attrs.prepend && attrs.prepend.tag !== "i") || (attrs.append && attrs.append.tag !== "i")},
						{disabled: attrs.disabled},
						"input"];
	},
  view (vnode) {
		let attrs = vnode.attrs;
		let inputAttrs = omit(attrs, ['prepend', 'append', 'dom']);
		inputAttrs.className = attrs.type === "hidden"? "hidden": "";

    return m('div', attrs.dom,
						 attrs.prepend,
						 m('input', inputAttrs),
						 attrs.append
    );
  }
});
