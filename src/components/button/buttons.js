import {base} from "./../base.js";
import component from "mithril-componentx";
import m from "mithril";
import {numberMap, properKeys, colorClassMap, sizeMap} from "./../../helpers/enums.js";
import {required, within} from "validatex";


export const buttons = component({
	base: base,
	attrSchema: {
		buttonCount: [required(false), within(properKeys(numberMap))],
		color: [required(false), within(properKeys(colorClassMap))],
		size: [required(false), within(properKeys(sizeMap))]
	},
	getClassList (attrs) {
		return [
			"ui",
			{icon: attrs.icon},
			{vertical: attrs.vertical},
			{labeled: attrs.labeled},
			numberMap[attrs.buttonCount],
			colorClassMap[attrs.color],
			{basic: attrs.basic},
			sizeMap[attrs.size],
			"buttons"
		];
	},
	getDefaultAttrs (attrs) {
		return {root: "div"};
	}
});
