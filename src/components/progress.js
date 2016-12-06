import {base} from "./base.js";
import component from "mithril-componentx";
import {required, isNumber, within} from "validatex";
import _ from "mithril";
import {attachmentMap, sizeMap, colorClassMap} from "./../helpers/enums.js";


const states = ["active", "success", "warning", "error", "disabled"];

export const bar = component({
	name: "progressBar",
	base: base,
	attrSchema: {
		percent: [required(true), isNumber()]
	},
	view ({attrs, children, state}) {
		return _("div.bar", {style: {width: `${attrs.percent}%`}});
	}
});

export const progress = component({
	name: "progress",
	base: base,
	attrSchema: {
		percent: [required(true), isNumber()],
		state: [required(false), within(states)]
	},
	getClassList (attrs) {
		return [
			"ui",
			{indicating: attrs.indicating},
			{inverted: attrs.inverted},
			attachmentMap[attrs.attach],
			sizeMap[attrs.size],
			colorClassMap[attrs.color],
			"progress"
		];
	},
	view ({attrs, children, state}) {
		return _("div", attrs.rootAttrs,
				_(bar, {percent: attrs.percent}));
	}
});
