import {base} from "./base.js";
import _ from "lodash";
import enums from "./../helpers/enums.js";
import component from "mithril-componentx";

var floatClassMap = {
  "left": "left floated",
  "right": "right floated"
};

export const column = component({
  base: base,
	attrSchema: {
		float: {inclusion: {within: _.keys(floatClassMap),
												message: "^Invalid value '%{value}'."}},
		width: {inclusion: {within: enums.properKeys(enums.widthClassMap),
												message: "^Invalid value '%{value}'."}},
		color: {inclusion: {within: _.keys(enums.colorClassMap),
												message: "^Invalid value '%{value}'."}},
		textAlignment: {inclusion: {within: _.keys(enums.textAlignmentClassMap),
																message: "^Invalid value '%{value}'."}},
		visible: {inclusion: {within: _.keys(enums.visibleClassMap),
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
	floatClassMap: floatClassMap,
	widthClassMap: enums.widthClassMap,
	colorClassMap: enums.colorClassMap,
	textAlignmentClassMap: enums.textAlignmentClassMap,
	visibleClassMap: enums.visibleClassMap,
	getClassList (attrs) {
		return [this.floatClassMap[attrs.float],
						this.widthClassMap[attrs.width],
						this.colorClassMap[attrs.color],
						this.textAlignmentClassMap[attrs.textAlignment],
						this.visibleClassMap[attrs.visible],
						attrs.mobile? this.widthClassMap[attrs.mobile] + " mobile": "",
						attrs.tablet? this.widthClassMap[attrs.tablet] + " tablet": "",
						attrs.computer? this.widthClassMap[attrs.computer] + " computer": "",
						attrs.largeScreen? this.widthClassMap[attrs.largeScreen] + " large screen": "",
						attrs.widescreen? this.widthClassMap[attrs.widescreen] + " widescreen": "",
						"column"];
	}
});
