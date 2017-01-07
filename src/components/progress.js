import {Base} from "./base.js";
import {required, isNumber, within} from "validatex";
import _ from "mithril";
import {attachmentMap, sizeMap, colorMap} from "./../helpers/enums.js";


const states = ["active", "success", "warning", "error", "disabled"];

export class Bar extends Base {
	attrSchema = {
		percent: [required(true), isNumber()],
		state: [required(false), within(states)]
	}

	view ({attrs, children, state}) {
		return _("div.bar", {style: {width: `${attrs.percent}%`}});
	}
}


export const bar = new Bar();


export class Progress extends Base {
	attrSchema = {
		percent: [required(true), isNumber()],
		state: [required(false), within(states)]
	}

	getClassList (attrs) {
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

export const progress = new Progress();
