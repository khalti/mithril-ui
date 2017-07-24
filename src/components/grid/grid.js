import {UI} from "./../base.js";
import enums from "./../../helpers/enums.js";
import {required, within} from "validatex";
import {properKeys} from "./../../helpers/misc.js";


let divideMap = {
  "horizontally": "divided",
  "vertically": "vertically divided"
};

let cellMap = {
  "externally": "celled",
  "internally": "internally celled"
};

let paddedMap = {
  true: "padded",
  vertical: "vertically padded",
  horizontal: "horizontally padded"
};

let stackableMap = {
  true: "stackable",
  false: ""
};

let attrSchema = {
	// TODO: rename columns to columnCount
  columns: [required(false),
						within(properKeys(enums.columnsMap),
									"Invalid column count '{value}'.")],
  divide: [required(false), within(Object.keys(divideMap), "Invalid value '{value}'.")],
  cell: [required(false), within(Object.keys(cellMap), "Invalid value '{value}'.")],
  equalWidth: [required(false), within([true, false], "'{value}' is not a boolean.")],
  padded: [required(false), within([true, false], "'{value}' is not a boolean.")],
  relaxed: [required(false), within([true, false], "'{value}' is not a boolean.")],
  centered: [required(false), within([true, false], "'{value}' is not a boolean.")],
  textAlignment: [required(false), within(Object.keys(enums.textAlignmentMap),
																					"Invalid value '{value}'.")],
  verticalAlignment: [required(false), within(Object.keys(enums.verticalAlignmentMap),
																							"^Invalid value '%{value}'.")],
  doubling: [required(false), within([true, false], "'{value}' is not a boolean.")],
  stackable: [required(false), within([true, false], "'{value}' is not a boolean.")],
  reverse: [required(false), within(Object.keys(enums.reverseMap),
																		"Invalid value '{value}'.")]
};

export class Grid  extends UI {
	attrSchema = attrSchema

	getClassList ({attrs}) {
		return ["ui",
						enums.columnsMap[attrs.columns],
						divideMap[attrs.divide],
						cellMap[attrs.cell],
						attrs.equalWidth && "equal width",
						paddedMap[attrs.padded],
						attrs.relaxed && "relaxed",
						enums.centeredMap[attrs.centered],
						enums.textAlignmentMap[attrs.textAlignment],
						enums.verticalAlignmentMap[attrs.verticalAlignment],
						attrs.doubling && "doubling",
						attrs.stackable && "stackable",
						enums.reverseMap[attrs.reverse],
						attrs.inverted && "inverted",
						attrs.container && "container",
						"grid"];
	}
}
