import {base} from "./base.js";
import keys from "lodash/keys";
import reduce from "lodash/reduce";
import enums from "./../helpers/enums.js";
import component from "mithril-componentx";


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
		visible: {inclusion: {within: keys(enums.visibleClassMap),
													message: "^Invalid value '%{value}'."}},
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
		attrs.visible = attrs.visible || [];
		if (attrs.visible.length > 0) {
			attrs.visible.push("only");
			visibleClass = reduce(attrs.visible, (className, device) => {
				return `${className} ${device}`;
			})
		}

		return [enums.floatMap[attrs.float],
						enums.widthClassMap[attrs.width],
						enums.colorClassMap[attrs.color],
						enums.textAlignmentClassMap[attrs.textAlignment],
						visibleClass,
						attrs.mobile? enums.widthClassMap[attrs.mobile] + " mobile": "",
						attrs.tablet? enums.widthClassMap[attrs.tablet] + " tablet": "",
						attrs.computer? enums.widthClassMap[attrs.computer] + " computer": "",
						attrs.largeScreen? enums.widthClassMap[attrs.largeScreen] + " large screen": "",
						attrs.widescreen? enums.widthClassMap[attrs.widescreen] + " widescreen": "",
						"column"];
	}
});
