import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";
import omit from "lodash/omit.js";
import {colorClassMap} from "./../helpers/enums.js";

let floatMap = {
	right: "right floated",
	left: "left floated"
};

export const button = component({
  base: base,
	attrSchema: {
		label: {presence: true}
	},
	getDefaultAttrs (attrs) {
		let defaultAttrs = {dom: {tagName: "button"}};
		if (attrs.type) {
			defaultAttrs.dom.type = attrs.type;
		}
		return defaultAttrs;
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

		return m(attrs.dom.tagName, omit(attrs.dom, ["tagName"]),
						 attrs.icon,
						 attrs.label);
	}
});
