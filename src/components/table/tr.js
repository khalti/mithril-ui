import {Base} from "./../base.js";
import _ from "mithril";
import {required, within} from "validatex";
import {verticalAlignmentClassMap, textAlignmentClassMap} from "./../../helpers/enums.js";
import keys from "lodash/keys";


export class TR extends Base {
	attrSchema = {
		verticalAlignment: [required(false), within(keys(verticalAlignmentClassMap))],
		textAlignment: [required(false), within(keys(textAlignmentClassMap))]
	}

	getClassList (attrs) {
		return [
			verticalAlignmentClassMap[attrs.verticalAlignment],
			textAlignmentClassMap[attrs.textAlignment]
		];
	}

	getDefaultAttrs ({attrs}) {
		return {root: "tr"};
	}
}


export const tr = new TR();
