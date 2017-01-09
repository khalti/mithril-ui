import {UI} from "./../base.js";
import _ from "mithril";
import {required, within} from "validatex";
import {
	verticalAlignmentMap,
	widthMap,
	textAlignmentMap} from "./../../helpers/enums.js";


export const sortMap = {
	"ascending": "sorted ascending",
	"descending": "sorted descending"
};

export class TH extends UI {
	attrSchema = {
		verticalAlignment: [required(false), within(Object.keys(verticalAlignmentMap))],
		textAlignment: [required(false), within(Object.keys(textAlignmentMap))],
		width: [required(false), within(Object.keys(widthMap))],
		sort: [required(false), within(Object.keys(sortMap))]
	}

	isRootAttr (key) {
		try {
			return /^(key|id|style|on.*|data-.*|config|rowspan|colspan)$/.test(key)? true: false;
		}
		catch (err) {
			if (err instanceof TypeError) {
				return false;
			}
		}
	}

	getClassList ({attrs}) {
		return [
			verticalAlignmentMap[attrs.verticalAlignment],
			textAlignmentMap[attrs.textAlignment],
			widthMap[attrs.width],
			attrs.collapsing && "collapsing",
			sortMap[attrs.sort]
		];
	}

	getDefaultAttrs ({attrs}) {
		return {root: "th"};
	}
}


export const th = new TH();
