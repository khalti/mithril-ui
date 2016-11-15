import {base} from "./../base.js";
import component from "mithril-componentx";
import m from "mithril";
import {
	colorClassMap,
	sizeMap,
	columnsClassMap} from "./../../helpers/enums.js";
import keys from "lodash/keys";
import {required, within} from "validatex";


export const table = component({
	name: "table",
	base: base,
	attrSchema: {
		columnCount: [required(false), within(keys(columnsClassMap))],
		color: [required(false), within(keys[colorClassMap])],
		size: [required(false), within(keys[sizeMap])],
	},
	getClassList (attrs) {
		return [
			"ui",
			{"single line": attrs.singleLine},
			{fixed: attrs.fixed},
			attrs.stackable? "stackable": "unstackable",
			{selectable: attrs.selectable},
			{striped: attrs.striped},
			{celled: attrs.celled},
			{basic: attrs.basic},
			{"very basic": attrs.veryBasic},
			columnsClassMap[attrs.columnCount],
			{collapsing: attrs.collapsing},
			colorClassMap[attrs.color],
			{inverted: attrs.inverted},
			{sortable: attrs.sortable},
			{padded: attrs.padded},
			{compact: attrs.compact},
			sizeMap[attrs.size],
			"table"
		];
	},
	getDefaultAttrs (attrs) {
		return {root: "table"};
	}
});
