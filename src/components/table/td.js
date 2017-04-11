import {UI} from "./../base.js";
import _ from "mithril";
import {required, within} from "validatex";
import {
	verticalAlignmentMap,
	widthMap,
	textAlignmentMap} from "./../../helpers/enums.js";


const states = ["positive", "negative", "error", "warning", "active", "disabled"];

export class TD extends UI {
	attrSchema = {
		state: [required(false), within(states)],
		verticalAlignment: [required(false), within(Object.keys(verticalAlignmentMap))],
		textAlignment: [required(false), within(Object.keys(textAlignmentMap))],
		width: [required(false), within(Object.keys(widthMap))]
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
			attrs.state,
			attrs.selectable && "selectable",
			verticalAlignmentMap[attrs.verticalAlignment],
			textAlignmentMap[attrs.textAlignment],
			attrs.collapsing && "collapsing",
			widthMap[attrs.width]
		];
	}

	getDefaultAttrs ({attrs}) {
		return {root: "td"};
	}
}
