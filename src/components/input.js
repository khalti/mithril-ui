import m from 'mithril';
import component from "mithril-componentx";

export const input = component({
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

    return m('div', attrs.dom,
						 attrs.prepend,
						 m('input', {type: attrs.type, className: attrs.type == "hidden"? "hidden": ""}),
						 attrs.append
    );
  }
});
