import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";
import omit from "lodash/omit";
import {colorClassMap, floatMap} from "./../helpers/enums.js";

export const button = component({
  base: base,
	attrSchema: {
		label: {presence: true}
	},
	getDefaultAttrs (attrs) {
		return {dom: {tagName: "button"}};
	},
	getClassList (attrs) {
		return [
			"ui",
			attrs.size,
			floatMap[attrs.float],
			colorClassMap[attrs.color],
			{circular: attrs.circular},
			{fluid: attrs.fluid},
			{compact: attrs.compact},
			{loading: attrs.loading},
			{disabled: attrs.disabled},
			{active: attrs.active},
			{basic: attrs.basic},
			{inverted: attrs.inverted},
			{labeled: attrs.icon && attrs.label? true: false},
			{icon: attrs.icon? true: false},
			"button"
		];
	},
	view (vnode) {
		let attrs = vnode.attrs;

		return m(attrs.dom.tagName, omit(attrs.dom, ["tagname"]),
						 attrs.icon,
						 attrs.label);
	}
});
