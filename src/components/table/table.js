import {UI} from "./../base.js";
import _ from "mithril";
import {
	colorMap,
	sizeMap,
	columnsMap} from "./../../helpers/enums.js";
import {required, within} from "validatex";


export class Table extends UI {
	attrSchema = {
		columnCount: [required(false), within(Object.keys(columnsMap))],
		color: [required(false), within(Object.keys(colorMap))],
		size: [required(false), within(Object.keys(sizeMap))],
	}

	getClassList ({attrs}) {
		return [
			"ui",
			attrs.singleLine && "single line",
			attrs.fixed && "fixed",
			attrs.stackable? "stackable": "unstackable",
			attrs.selectable && "selectable",
			attrs.striped && "striped",
			attrs.celled && "celled",
			attrs.basic && "basic",
			attrs.veryBasic && "very basic",
			columnsMap[attrs.columnCount],
			attrs.collapsing && "collapsing",
			colorMap[attrs.color],
			attrs.inverted && "inverted",
			attrs.sortable && "sortable",
			attrs.padded && "padded",
			attrs.compact && "compact",
			sizeMap[attrs.size],
			"table"
		];
	}

	getDefaultAttrs ({attrs}) {
		return {root: "table"};
	}
}


export const table = new Table();
