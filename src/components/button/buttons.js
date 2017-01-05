import {Base} from "./../base.js";
import _ from "mithril";
import {numberMap, properKeys, colorClassMap, sizeMap} from "./../../helpers/enums.js";
import {required, within} from "validatex";


export class Buttons extends Base {
	attrSchema = {
		buttonCount: [required(false), within(properKeys(numberMap))],
		color: [required(false), within(properKeys(colorClassMap))],
		size: [required(false), within(properKeys(sizeMap))]
	}

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
			{fluid: attrs.fluid},
			"buttons"
		];
	}

	getDefaultAttrs ({attrs}) {
		return {root: "div"};
	}
}


export const buttons = new Buttons();
