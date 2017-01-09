import {UI} from "./base.js";
import _ from "mithril";
import omit from "lodash/omit";
import {verticalAlignmentMap, floatMap} from "./../helpers/enums.js";
import {required} from "validatex";


export class Image extends UI {
	attrSchema = {
		src: required(true)
	}

	getDefaultAttrs ({attrs}) {
		if (attrs.link) {
			return {rootAttrs: {href: attrs.link}};
		}
		return {rootAttrs: {src: attrs.src}};
	}
	
	getClassList ({attrs}) {
		return ["ui",
						attrs.hidden && "hidden",
						attrs.disabled && "disabled",
						 attrs.bordered && "bordered",
						attrs.fluid && "fluid",
						attrs.rounded && "rounded",
						attrs.circular && "circular",
						attrs.centered && "centered",
						attrs.spaced && "spaced",
						verticalAlignmentMap[attrs.verticalAlignment],
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
