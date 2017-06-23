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
						attrs.inline && "inline",
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
		let root;

		if (attrs.root) {
			root = attrs.root;
			delete attrs.rootAttrs["src"]
		}

		if(attrs.link) {
			root = "a";
		}

		return root
			? _(root, attrs.rootAttrs,
							 _("img", {src: attrs.src}))
			: _("img", attrs.rootAttrs);
  }
}
