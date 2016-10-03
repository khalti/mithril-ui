import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";
import omit from "lodash/omit";
import keys from "lodash/keys";
import {colorClassMap, floatMap, emphasisMap, sizeMap} from "./../helpers/enums.js";
import {within, required} from "validatex";

export const button = component({
	name: "button",
  base: base,
	attrSchema: {
		size: [ required(false),
						within(keys(sizeMap), "Invalid size {value}.")],
	},
	getDefaultAttrs (attrs) {
		let defaultAttrs = {root: "button"};
		if (attrs.type) {
			defaultAttrs.rootAttrs = {type : attrs.type};
		}
		return defaultAttrs;
	},
	getClassList (attrs) {
		return [
			"ui",
			sizeMap[attrs.size],
			floatMap[attrs.float],
			colorClassMap[attrs.color],
			emphasisMap[attrs.emphasis],
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
		let children = vnode.children || [];

		if (attrs.label || attrs.icon) {
			children = [attrs.icon, attrs.label];
		}

		return m(attrs.root, attrs.rootAttrs, children);
	}
});
