import {base} from "./base.js";
import component from "mithril-componentx";
import keys from "lodash/keys";
import enums from "./../helpers/enums.js";
import reduce from "lodash/reduce";
import clone from "lodash/clone";


let stretchedMap = {
	true: "stretched",
	false: ""
};

export const row = component({
	base: base,
	attrSchema: {
		columns: {inclusion: {within: enums.properKeys(enums.columnsClassMap),
													message: "^Invalid value '%{value}'."}},
		stretched: {inclusion: {within: [true, false],
														message: "^%{value} is not a boolean value."}},
		color: {inclusion: {within: keys(enums.colorClassMap),
												message: "^Invalid value '%{value}'."}},
		centered: {inclusion: {within: [true, false],
														message: "^%{value} is not a boolean value."}},
		textAlignment: {inclusion: {within: keys(enums.textAlignmentClassMap),
																message: "^Invalid value '%{value}'."}},
		verticalAlignment: {inclusion: {within: keys(enums.verticalAlignmentClassMap),
																		message: "^Invalid value '%{value}'."}},
		 // visible: {inclusion: {within: enums.devices,
		 // 											message: "^Invalid value '%{value}'."}},
		reverse: {inclusion: {within: keys(enums.reverseClassMap),
													message: "^Invalid value '%{value}'."}}
	},
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
});
