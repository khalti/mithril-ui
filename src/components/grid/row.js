import {Base} from "./../base.js";
import keys from "lodash/keys";
import enums from "./../../helpers/enums.js";
import reduce from "lodash/reduce";
import clone from "lodash/clone";
import {required, within} from "validatex";


let stretchedMap = {
	true: "stretched",
	false: ""
};

export class Row extends Base {
	attrSchema = {
		columns: [required(false), within(enums.properKeys(enums.columnsClassMap),
																			"Invalid value '{value}'.")],
		stretched: [required(false), within([true, false],
																				"'{value}' is not a boolean value.")],
		color: [required(false), within(keys(enums.colorClassMap),
																		"Invalid value '%{value}'.")],
		centered: [required(false), within([true, false],
																			"'{value}' is not a boolean value.")],
		textAlignment: [required(false), within(keys(enums.textAlignmentClassMap),
																						"Invalid value '{value}'.")],
		verticalAlignment: [required(false), within(keys(enums.verticalAlignmentClassMap),
																								"Invalid value '{value}'.")],
		 // visible: {inclusion: {within: enums.devices,
		 // 											message: "^Invalid value '%{value}'."}},
		reverse: [required(false), within(keys(enums.reverseClassMap),
																			"Invalid value '{value}'.")]
	}

	getClassList (attrs) {
		let visibleClass;
		let visibility = clone(attrs.visible || []);
		if (visibility.length > 0) {
			visibleClass = reduce(visibility, (className, device) => {
				return `${className} ${enums.deviceMap[device]}`;
			})
		}

		return [enums.columnsClassMap[attrs.columns],
						stretchedMap[attrs.stretched],
						enums.colorClassMap[attrs.color],
						enums.centeredClassMap[attrs.centered],
						enums.textAlignmentClassMap[attrs.textAlignment],
						enums.verticalAlignmentClassMap[attrs.verticalAlignment],
						visibleClass? visibleClass + " only": "",
						enums.reverseClassMap[attrs.reverse],
						"row"];
	}
}


export const row = new Row();
