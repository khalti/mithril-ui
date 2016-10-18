import {base} from "./../base.js";
import component from "mithril-componentx";
import m from "mithril";
import {required, within} from "validatex";
import {
	verticalAlignmentClassMap,
	widthClassMap,
	textAlignmentClassMap} from "./../../helpers/enums.js";
import keys from "lodash/keys";


const sortMap = {
	"ascending": "sorted ascending",
	"descending": "sorted descending"
};

export const th = component({
	base: base,
	attrSchema: {
		verticalAlignment: [required(false), within(keys(verticalAlignmentClassMap))],
		textAlignment: [required(false), within(keys(textAlignmentClassMap))],
		width: [required(false), within(keys(widthClassMap))],
		sorte: [required(false), within(keys(sortMap))]
	},
	getClassList (attrs) {
		return [
			verticalAlignmentClassMap[attrs.verticalAlignment],
			textAlignmentClassMap[attrs.textAlignment],
			widthClassMap[attrs.width],
			{collapsing: attrs.collapsing},
			sortMap[attrs.sorte]
		];
	},
	getDefaultAttrs (attrs) {
		return {root: "th"};
	}
});
