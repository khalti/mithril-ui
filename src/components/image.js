import {Base} from "./base.js";
import _ from "mithril";
import omit from "lodash/omit";
import {verticalAlignmentClassMap, floatMap} from "./../helpers/enums.js";
import {required} from "validatex";


export class Image extends Base {
	attrSchema = {
		src: required(true)
	}

	getDefaultAttrs ({attrs}) {
		if (attrs.link) {
			return {rootAttrs: {href: attrs.link}};
		}
		return {rootAttrs: {src: attrs.src}};
	}
	
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
	}

  view (vdom) {
		let attrs = vdom.attrs;

		if(attrs.link) {
			return _("a", attrs.rootAttrs,
							 _("img", {src: attrs.src}));
		}

    return _("img", attrs.rootAttrs);
  }
}


export const image = new Image();
