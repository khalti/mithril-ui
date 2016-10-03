import {base} from "./base.js";
import component from "mithril-componentx";
import keys from "lodash/keys";
import enums from "./../helpers/enums.js";
import {required, within} from "validatex";


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
  columns: [required(false),
						within(enums.properKeys(enums.columnsClassMap),
									"Invalid column count '{value}'.")],
  divide: [required(false), within(keys(divideClassMap), "Invalid value '{value}'.")],
  cell: [required(false), within(keys(cellClassMap), "Invalid value '{value}'.")],
  equalWidth: [required(false), within([true, false], "'{value}' is not a boolean.")],
  padded: [required(false), within([true, false], "'{value}' is not a boolean.")],
  relaxed: [required(false), within([true, false], "'{value}' is not a boolean.")],
  centered: [required(false), within([true, false], "'{value}' is not a boolean.")],
  textAlignment: [required(false), within(keys(enums.textlignmentClassMap),
																					"Invalid value '{value}'.")],
  verticalAlignment: [required(false), within(keys(enums.verticalAlignmentClassMap),
																							"^Invalid value '%{value}'.")],
  doubling: [required(false), within([true, false], "'{value}' is not a boolean.")],
  stackable: [required(false), within([true, false], "'{value}' is not a boolean.")],
  reverse: [required(false), within(keys(enums.reverseClassMap),
																		"Invalid value '{value}'.")]
};

export const grid = component({
	name: "grid",
  base: base,
	attrSchema: attrSchema,
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
