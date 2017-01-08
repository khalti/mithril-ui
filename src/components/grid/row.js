import {properKeys} from "./../../helpers/misc.js";
import {Base} from "./../base.js";
import enums from "./../../helpers/enums.js";
import clone from "lodash/clone";
import {required, within} from "validatex";


let stretchedMap = {
	true: "stretched",
	false: ""
};

export class Row extends Base {
	attrSchema = {
		columns: [required(false), within(properKeys(enums.columnsMap),
																			"Invalid value '{value}'.")],
		stretched: [required(false), within([true, false],
																				"'{value}' is not a boolean value.")],
		color: [required(false), within(Object.keys(enums.colorMap),
																		"Invalid value '%{value}'.")],
		centered: [required(false), within([true, false],
																			"'{value}' is not a boolean value.")],
		textAlignment: [required(false), within(Object.keys(enums.textAlignmentMap),
																						"Invalid value '{value}'.")],
		verticalAlignment: [required(false), within(Object.keys(enums.verticalAlignmentMap),
																								"Invalid value '{value}'.")],
		 // visible: {inclusion: {within: enums.devices,
		 // 											message: "^Invalid value '%{value}'."}},
		reverse: [required(false), within(Object.keys(enums.reverseMap),
																			"Invalid value '{value}'.")]
	}

	getClassList ({attrs}) {
		let visibleClass;
		let visibility = clone(attrs.visible || []);
		if (visibility.length > 0) {
			visibleClass = visibility.reduce((className, device) => {
				return `${className} ${enums.deviceMap[device]}`;
			}, "");
		}

		return [enums.columnsMap[attrs.columns],
						stretchedMap[attrs.stretched],
						enums.colorMap[attrs.color],
						enums.centeredMap[attrs.centered],
						enums.textAlignmentMap[attrs.textAlignment],
						enums.verticalAlignmentMap[attrs.verticalAlignment],
						visibleClass? visibleClass + " only": "",
						enums.reverseMap[attrs.reverse],
						"row"];
	}
}


export const row = new Row();
