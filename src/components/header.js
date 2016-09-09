import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";
import {properKeys,
				attachmentMap,
				floatMap,
				textAlignmentClassMap,
				colorClassMap} from "./../helpers/enums.js";
import {required, within} from "validatex";


let levelMap = {
	1: "h1",
	2: "h2",
	3: "h3",
	4: "h4",
	5: "h5",
	6: "h6"
};

export const header = component({
  base: base,
	attrSchema: {
		level: [required(false), within(properKeys(levelMap), "Invalid level '{value}.'")]
	},
	getDefaultAttrs (attrs) {
		return {};
	},
	getClassList (attrs) {
		return ["ui",
						{icon: attrs.pyramid},
						{disabled: attrs.disabled},
						{dividing: attrs.dividing},
						{block: attrs.block},
						attachmentMap[attrs.attach],
						floatMap[attrs.float],
						textAlignmentClassMap[attrs.textAlignment],
						colorClassMap[attrs.color],
						{inverted: attrs.inverted},
						"header"];
	},
	view (vnode) {
		let attrs = vnode.attrs;

		return m(levelMap[attrs.level] || "div", attrs.rootAttrs, vnode.children);
	}
});
