import {base} from "./base.js";
import component from "mithril-componentx";
import keys from "lodash/keys";
import enums from "./../helpers/enums.js";

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
		visible: {inclusion: {within: keys(enums.visibleClassMap),
													message: "^Invalid value '%{value}'."}},
		reverse: {inclusion: {within: keys(enums.reverseClassMap),
													message: "^Invalid value '%{value}'."}}
	},
	columnsClassMap: enums.columnsClassMap,
	stretchedClassMap: {
		true: "stretched",
		false: ""
	},
	colorClassMap: enums.colorClassMap,
	centeredClassMap: enums.centeredClassMap,
	textAlignmentClassMap: enums.textAlignmentClassMap,
	verticalAlignmentClassMap: enums.verticalAlignmentClassMap,
	visibleClassMap: enums.visibleClassMap,
	reverseClassMap: enums.reverseClassMap,
	getClassList (attrs) {
		return [this.columnsClassMap[attrs.columns],
						this.stretchedClassMap[attrs.stretched],
						this.colorClassMap[attrs.color],
						this.centeredClassMap[attrs.centered],
						this.textAlignmentClassMap[attrs.textAlignment],
						this.verticalAlignmentClassMap[attrs.verticalAlignment],
						this.visibleClassMap[attrs.visible],
						this.reverseClassMap[attrs.reverse],
						"row"];
	}
});
