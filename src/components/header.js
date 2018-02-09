import {UI} from "./base.js";
import _ from "mithril";
import {attachmentMap,
				floatMap,
				textAlignmentMap,
				colorMap} from "./../helpers/enums.js";
import {required, within} from "validatex";
import {properKeys} from "./../helpers/misc.js";


let levelMap = {
	1: "h1",
	2: "h2",
	3: "h3",
	4: "h4",
	5: "h5",
	6: "h6"
};

export class Header extends UI {
	attrSchema = {
		level: [required(false), within(properKeys(levelMap), "Invalid level '{value}.'")]
	}

	getDefaultAttrs (vnode) {
		return {};
	}

	getClassList ({attrs}) {
		return ["ui",
						attrs.pyramid && "icon",
						attrs.disabled && "disabled",
						attrs.dividing && "dividing",
						attrs.block && "block",
						attachmentMap[attrs.attach],
						floatMap[attrs.float],
						textAlignmentMap[attrs.textAlignment],
						colorMap[attrs.color],
						attrs.inverted && "inverted",
						"header"];
	}

	view (vnode) {
		let attrs = vnode.attrs;

		return _(levelMap[attrs.level] || "div", attrs.rootAttrs, vnode.children);
	}
}


export class SubHeader extends UI {
	getClassList ({attrs}) {
		return ["sub header"];
	}
}


export class HeaderContent extends UI {
	getClassList ({attrs}) {
		return ["content"];
	}
}
