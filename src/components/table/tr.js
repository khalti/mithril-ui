import {UI} from "./../base.js";
import _ from "mithril";
import {required, within} from "validatex";
import {verticalAlignmentMap, textAlignmentMap} from "./../../helpers/enums.js";


export class TR extends UI {
	attrSchema = {
		verticalAlignment: [required(false), within(Object.keys(verticalAlignmentMap))],
		textAlignment: [required(false), within(Object.keys(textAlignmentMap))]
	}

	getClassList ({attrs}) {
		return [
			verticalAlignmentMap[attrs.verticalAlignment],
			textAlignmentMap[attrs.textAlignment]
		];
	}

	getDefaultAttrs ({attrs}) {
		return {root: "tr"};
	}
}
