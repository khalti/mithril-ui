import {base} from "./base.js";
import component from "mithril-componentx";
import keys from "lodash/keys";
import enums from "./../helpers/enums.js";

let divideClassMap = {
  "horizontally": "divided",
  "vertically": "vertically divided"
};

let cellClassMap = {
  "externally": "celled",
  "internally": "internally celled"
};

let paddedClassMap = {
  true: "padded",
  vertical: "vertically padded",
  horizontal: "horizontally padded"
};

let stackableClassMap = {
  true: "stackable",
  false: ""
};

let attrSchema = {
  columns: {inclusion: {within: enums.properKeys(enums.columnsClassMap),
                        message: "^Invalid column count '%{value}'."}},
  divide: {inclusion: {within: keys(divideClassMap),
                       message: "^Invalid value '%{value}'."}},
  cell: {inclusion: {within: keys(cellClassMap),
                     message: "^Invalid value '%{value}'."}},
  equalWidth: {inclusion: {within: [true, false],
                           message: "^'%{value}' is not a boolean."}},
  padded: {inclusion: {within: [true, false],
                       message: "^'%{value}' is not a boolean."}},
  relaxed: {inclusion: {within: [true, false],
                        message: "'%{value}' is not a boolean."}},
  centered: {inclusion: {within: [true, false],
                         message: "^'%{value}' is not a boolean."}},
  textAlignment: {inclusion: {within: keys(enums.textlignmentClassMap),
                            message: "^Invalid value '%{value}'."}},
  verticalAlignment: {inclusion: {within: keys(enums.verticalAlignmentClassMap),
                                  message: "^Invalid value '%{value}'."}},
  doubling: {inclusion: {within: [true, false],
                         message: "^'%{value}' is not a boolean."}},
  stackable: {inclusion: {within: [true, false],
                          message: "^'%{value}' is not a boolean."}},
  reverse: {inclusion: {within: keys(enums.reverseClassMap),
                         message: "^Invalid value '%{value}'."}}
};

export const grid = component({
  base: base,
	getClassList (attrs) {
		return ["ui",
						enums.columnsClassMap[attrs.columns],
						divideClassMap[attrs.divide],
						cellClassMap[attrs.cell],
						{"equal width": attrs.equalWidth},
						paddedClassMap[attrs.padded],
						{"relaxed": attrs.relaxed},
						enums.centeredClassMap[attrs.centered],
						enums.textAlignmentClassMap[attrs.textAlignment],
						enums.verticalAlignmentClassMap[attrs.verticalAlignment],
						{"doubling": attrs.doubling},
						{"stackable": attrs.stackable},
						enums.reverseClassMap[attrs.reverse],
						{inverted: attrs.inverted},
						"grid"];
	}
});
