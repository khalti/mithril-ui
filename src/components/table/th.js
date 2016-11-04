import {base} from "./../base.js";
import component from "mithril-componentx";
import m from "mithril";
import {required, within} from "validatex";
import {
	verticalAlignmentClassMap,
	widthClassMap,
	textAlignmentClassMap} from "./../../helpers/enums.js";
import keys from "lodash/keys";


export const sortMap = {
	"ascending": "sorted ascending",
	"descending": "sorted descending"
};

export const th = component({
	base: base,
	attrSchema: {
		verticalAlignment: [required(false), within(keys(verticalAlignmentClassMap))],
		textAlignment: [required(false), within(keys(textAlignmentClassMap))],
		width: [required(false), within(keys(widthClassMap))],
		sort: [required(false), within(keys(sortMap))]
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
			verticalAlignmentClassMap[attrs.verticalAlignment],
			textAlignmentClassMap[attrs.textAlignment],
			widthClassMap[attrs.width],
			{collapsing: attrs.collapsing},
			sortMap[attrs.sort]
		];
	},
	getDefaultAttrs (attrs) {
		return {root: "th"};
	}
});
