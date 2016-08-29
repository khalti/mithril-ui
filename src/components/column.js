import {base} from "./base.js";
import keys from "lodash/keys";
import reduce from "lodash/reduce";
import enums from "./../helpers/enums.js";
import component from "mithril-componentx";
import clone from "lodash/clone";


export const column = component({
  base: base,
	attrSchema: {
		float: {inclusion: {within: keys(enums.floatMap),
												message: "^Invalid value '%{value}'."}},
		width: {inclusion: {within: enums.properKeys(enums.widthClassMap),
												message: "^Invalid value '%{value}'."}},
		color: {inclusion: {within: keys(enums.colorClassMap),
												message: "^Invalid value '%{value}'."}},
		textAlignment: {inclusion: {within: keys(enums.textAlignmentClassMap),
																message: "^Invalid value '%{value}'."}},
		// visible: {inclusion: {within: enums.devices,
		// 											message: "^Invalid value '%{value}'."}},
		mobile: {inclusion: {within: enums.properKeys(enums.widthClassMap),
													message: "^Invalid value '%{value}'."}},
		tablet: {inclusion: {within: enums.properKeys(enums.widthClassMap),
													message: "^Invalid value '%{value}'."}},
		computer: {inclusion: {within: enums.properKeys(enums.widthClassMap),
														message: "^Invalid value '%{value}'."}},
		largeScreen: {inclusion: {within: enums.properKeys(enums.widthClassMap),
															message: "^Invalid value '%{value}'."}},
		widescreen: {inclusion: {within: enums.properKeys(enums.widthClassMap),
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

		return [enums.floatMap[attrs.float],
						enums.widthClassMap[attrs.width],
						enums.colorClassMap[attrs.color],
						enums.textAlignmentClassMap[attrs.textAlignment],
						visibleClass? visibleClass + " only": "",
						attrs.mobile? enums.widthClassMap[attrs.mobile] + " mobile": "",
						attrs.tablet? enums.widthClassMap[attrs.tablet] + " tablet": "",
						attrs.computer? enums.widthClassMap[attrs.computer] + " computer": "",
						attrs.largeScreen? enums.widthClassMap[attrs.largeScreen] + " large screen": "",
						attrs.widescreen? enums.widthClassMap[attrs.widescreen] + " widescreen": "",
						"column"];
	}
});
