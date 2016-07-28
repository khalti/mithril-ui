import {base} from "./base.js";
import component from "mithril-componentx";
import _ from "lodash";
import enums from "./../helpers/enums.js";

let divideClassMap = {
  "horizontally": "divided",
  "vertically": "vertically divided"
};

let cellClassMap = {
  "externally": "celled",
  "internally": "internally celled"
};

let equalWidthClassMap = {
  true: "equal width",
  false: ""
};

/*TODO vertically, horizontally, all*/
let paddedClassMap = {
  true: "padded",
  false: ""
};

let relaxedClassMap = {
  true: "relaxed",
  false: ""
};

let doublingClassMap = {
  true: "doubling",
  false: ""
};

let stackableClassMap = {
  true: "stackable",
  false: ""
};

let attrSchema = {
  columns: {inclusion: {within: enums.properKeys(enums.widthClassMap),
                        message: "^Invalid column count '%{value}'."}},
  divide: {inclusion: {within: _.keys(divideClassMap),
                       message: "^Invalid value '%{value}'."}},
  cell: {inclusion: {within: _.keys(cellClassMap),
                     message: "^Invalid value '%{value}'."}},
  equalWidth: {inclusion: {within: [true, false],
                           message: "^'%{value}' is not a boolean."}},
  padded: {inclusion: {within: [true, false],
                       message: "^'%{value}' is not a boolean."}},
  relaxed: {inclusion: {within: [true, false],
                        message: "'%{value}' is not a boolean."}},
  centered: {inclusion: {within: [true, false],
                         message: "^'%{value}' is not a boolean."}},
  textAlignment: {inclusion: {within: _.keys(enums.textlignmentClassMap),
                            message: "^Invalid value '%{value}'."}},
  verticalAlignment: {inclusion: {within: _.keys(enums.verticalAlignmentClassMap),
                                  message: "^Invalid value '%{value}'."}},
  doubling: {inclusion: {within: [true, false],
                         message: "^'%{value}' is not a boolean."}},
  stackable: {inclusion: {within: [true, false],
                          message: "^'%{value}' is not a boolean."}},
  reverse: {inclusion: {within: _.keys(enums.reverseClassMap),
                         message: "^Invalid value '%{value}'."}}
};

export const grid = component({
  base: base,
	attrSchema: attrSchema,
	columnsClassMap: enums.columnsClassMap,
	divideClassMap: divideClassMap,
	cellClassMap: cellClassMap,
	equalWidthClassMap: equalWidthClassMap,
	paddedClassMap: paddedClassMap,
	relaxedClassMap: relaxedClassMap,
	centeredClassMap: enums.centeredClassMap,
	textAlignmentClassMap: enums.textAlignmentClassMap,
	verticalAlignmentClassMap: enums.verticalAlignmentClassMap,
	doublingClassMap: doublingClassMap,
	stackableClassMap: stackableClassMap,
	reverseClassMap: enums.reverseClassMap,
	getClassList: function (attrs) {
		return ["ui",
						this.columnsClassMap[attrs.columns],
						this.divideClassMap[attrs.divide],
						this.cellClassMap[attrs.cell],
						this.equalWidthClassMap[attrs.equalWidth],
						this.paddedClassMap[attrs.padded],
						this.relaxedClassMap[attrs.relaxed],
						this.centeredClassMap[attrs.centered],
						this.textAlignmentClassMap[attrs.textAlignment],
						this.verticalAlignmentClassMap[attrs.verticalAlignment],
						this.doublingClassMap[attrs.doubling],
						this.stackableClassMap[attrs.stackable],
						this.reverseClassMap[attrs.reverse],
						"grid"];
	}
});
