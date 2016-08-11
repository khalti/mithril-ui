import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";
import omit from "lodash/omit";
import {verticalAlignmentClassMap, floatMap} from "./../helpers/enums.js";


export const image = component({
  base: base,
	attrSchema: {
		src: {presence: true}
	},
	getDefaultAttrs (attrs) {
		if (attrs.link) {
			return {dom: {href: attrs.link}};
		}
		return {dom: {src: attrs.src}};
	},
	getClassList (attrs) {
		return ["ui",
						{hidden: attrs.hidden},
						{disabled: attrs.disabled},
						{bordered: attrs.bordered},
						{fluid: attrs.fluid},
						{rounded: attrs.rounded},
						{circular: attrs.circular},
						{centered: attrs.centered},
						{spaced: attrs.spaced},
						verticalAlignmentClassMap[attrs.verticalAlignment],
						floatMap[attrs.float],
						attrs.size,
						"image"];
	},
  view (vdom) {
		let attrs = vdom.attrs;

		if(attrs.link) {
			return m("a", attrs.rootAttrs,
							 m("img", {src: attrs.src}));
		}

    return m("img", attrs.rootAttrs);
  }
});
