import m from 'mithril';
import component from "mithril-componentx";
import {base} from "./base.js";
import omit from "lodash/omit";
import omitBy from "lodash/omitBy";


let isEventHandler = (value, key) => {
	return /^on.*$/.test(key);
};

export const input = component({
	base: base,
	attrSchema: {type: {presence: true}},
	getClassList (attrs) {
		return ["ui",
						{both: (attrs.prepend && attrs.prepend.tag === "i") && (attrs.append && attrs.append.tag === "i")},
						{left: (attrs.prepend && attrs.prepend.tag === "i") && !(attrs.append && attrs.append.tag === "i")},
						{icon: (attrs.prepend && attrs.prepend.tag == "i") || (attrs.append && attrs.append.tag === "i")},
						{right: attrs.append && attrs.append.tag !== "i"},
						{labeled: (attrs.prepend && attrs.prepend.tag !== "i") || (attrs.append && attrs.append.tag !== "i")},
						{disabled: attrs.disabled},
						"input"];
	},
  view (vnode) {
		let attrs = vnode.attrs;
		let inputAttrs = omit(attrs, ['prepend', 'append', 'rootAttrs']);
		inputAttrs.className = attrs.type === "hidden"? "hidden": "";

    return m('div', omitBy(attrs.rootAttrs, isEventHandler),
						 attrs.prepend,
						 m('input', inputAttrs),
						 attrs.append
    );
  }
});
