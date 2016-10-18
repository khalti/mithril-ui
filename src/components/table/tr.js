import {base} from "./../base.js";
import component from "mithril-componentx";
import m from "mithril";
import {required, within} from "validatex";
import {verticalAlignmentClassMap, textAlignmentClassMap} from "./../../helpers/enums.js";
import keys from "lodash/keys";


export const tr = component({
	base: base,
	attrSchema: {
		verticalAlignment: [required(false), within(keys(verticalAlignmentClassMap))],
		textAlignment: [required(false), within(keys(textAlignmentClassMap))]
	},
	getClassList (attrs) {
		return [
			verticalAlignmentClassMap[attrs.verticalAlignment],
			textAlignmentClassMap[attrs.textAlignment]
		];
	},
	getDefaultAttrs (attrs) {
		return {root: "tr"};
	}
});
