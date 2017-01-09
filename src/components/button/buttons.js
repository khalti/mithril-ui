import {UI} from "./../base.js";
import _ from "mithril";
import {numberMap, colorMap, sizeMap} from "./../../helpers/enums.js";
import {required, within} from "validatex";
import {properKeys} from "./../../helpers/misc.js";


export class Buttons extends UI {
	attrSchema = {
		buttonCount: [required(false), within(properKeys(numberMap))],
		color: [required(false), within(properKeys(colorMap))],
		size: [required(false), within(properKeys(sizeMap))]
	}

	getClassList ({attrs}) {
		return [
			"ui",
			attrs.icon && "icon",
			attrs.vertical && "vertical",
			attrs.labeled && "labeled",
			numberMap[attrs.buttonCount],
			colorMap[attrs.color],
			attrs.basic && "basic",
			sizeMap[attrs.size],
			attrs.fluid && "fluid",
			"buttons"
		];
	}
}


export const buttons = new Buttons();
