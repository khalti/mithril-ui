import {UI} from "./../base.js";
import _ from "mithril";
import omit from "lodash/omit";
import {colorMap, floatMap, emphasisMap, sizeMap} from "./../../helpers/enums.js";
import {within, required} from "validatex";
import {Icon} from "./../icon/icon.js";
import {Label} from "./../label.js";
import {isArray} from "./../../helpers/type.js";
import {is} from "./../../helpers/misc.js";


export class Button extends UI {
	attrSchema = {
		size: [ required(false),
						within(Object.keys(sizeMap), "Invalid size {value}.")],
	}

	getDefaultAttrs ({attrs}) {
		let defaultAttrs = {root: "button"};
		if (attrs.type) {
			defaultAttrs.rootAttrs = {type : attrs.type};
		}
		return defaultAttrs;
	}

	getClassList ({attrs, children = []}) {
		if (!isArray(children)) {
			children = [children];
		}

		return [
			"ui",
			sizeMap[attrs.size],
			floatMap[attrs.float],
			colorMap[attrs.color],
			emphasisMap[attrs.emphasis],
			attrs.circular && "circular",
			attrs.fluid && "fluid",
			attrs.compact && "compact",
			attrs.loading && "loading",
			attrs.disabled && "disabled",
			attrs.active && "active",
			attrs.basic && "basic",
			attrs.inverted && "inverted",
			children.some((child) => is(child.tag, Icon)) && "icon",
			children.some((child) => is(child.tag, Label)) && "label",
			"button"
		];
	}

	view ({attrs, children, state}) {
		if (attrs.href) {
			attrs.root = "a";
			attrs.rootAttrs.href = attrs.href;

			if (attrs.href && !attrs.href.match(/^(https?:\/\/)|(www\.)/)) {
				attrs.rootAttrs.oncreate = _.route.link;
			}
		}

		return _(attrs.root, attrs.rootAttrs, children);
	}
}


export const button = new Button();
