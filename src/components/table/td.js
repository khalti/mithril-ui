import {base} from "./../base.js";
import component from "mithril-componentx";
import m from "mithril";
import {required, within} from "validatex";
import {
	verticalAlignmentClassMap,
	widthClassMap,
	textAlignmentClassMap} from "./../../helpers/enums.js";
import keys from "lodash/keys";


const states = ["positive", "negative", "error", "warning", "active", "disabled"];

export const td = component({
	base: base,
	attrSchema: {
		state: [required(false), within(states)],
		verticalAlignment: [required(false), within(keys(verticalAlignmentClassMap))],
		textAlignment: [required(false), within(keys(textAlignmentClassMap))],
		width: [required(false), within(keys(widthClassMap))]
	},
	isRootAttr (value, key) {
		try {
			return /^(key|id|style|on.*|data-.*|config|rowspan|colspan)$/.test(key)? true: false;
		}
		catch (err) {
			if (err instanceof TypeError) {
				return false;
			}
		}
	},
	getClassList (attrs) {
		return [
			attrs.state,
			{selectable: attrs.selectable},
			verticalAlignmentClassMap[attrs.verticalAlignment],
			textAlignmentClassMap[attrs.textAlignment],
			{collapsing: attrs.collapsing},
			widthClassMap[attrs.width]
		];
	},
	getDefaultAttrs (attrs) {
		return {root: "td"};
	}
});
