import {UI} from "./base.js";
import {required, isNumber, within} from "validatex";
import _ from "mithril";
import {attachmentMap, sizeMap, colorMap} from "./../helpers/enums.js";


const states = ["active", "success", "warning", "error", "disabled"];

export class Bar extends UI {
	attrSchema = {
		percent: [required(true), isNumber()],
		state: [required(false), within(states)]
	}

	view ({attrs, children, state}) {
		attrs.rootAttrs.style = {width: `${attrs.percent}%`};
		return _(".bar", attrs.rootAttrs);
	}
}


export class Progress extends UI {
	attrSchema = {
		percent: [required(true), isNumber()],
		state: [required(false), within(states)]
	}

	getClassList ({attrs}) {
		return [
			"ui",
			attrs.indicating && "indicating",
			attrs.inverted && "inverted",
			attachmentMap[attrs.attach],
			sizeMap[attrs.size],
			attrs.state,
			colorMap[attrs.color],
			"progress"
		];
	}

	view ({attrs, children, state}) {
		return _("div", attrs.rootAttrs,
				_(bar, {percent: attrs.percent}));
	}
}
