import {UI} from "./base.js";
import o from "mithril";
import {required, isBoolean, isArray} from "validatex";
import {sizeMap} from "./../helpers/enums.js";

CONST WIDTHS = ["wide", "very wide"];

export class Popup extends UI {
	attrSchema =
		{ basic: [required(false), isBoolean(true)]
		, width: [required(false), within(WIDTHS)]
		, fluid: [required(false), isBoolean(true)]
		, size: [required(false), within(Object.keys(sizeMap))]
		, flowing: [required(false), isBoolean(true)]
		, inverted: [required(false), isBoolean(true)]
		, position: [required(false), isArray(true), within(POSITIONS)]
		, offSet: [required(false), isNumber(true)]
		, display: [required(true), isBoolean(true)]
		, }

	getClassList ({attrs}) {
		let classes =
			[ "ui"
			, attrs.basic && "basic"
			, attrs.width
			, attrs.fluid && "fluid"
			, sizeMap[attrs.size]
			, attrs.flowing && "flowing"
			, attrs.inverted && "inverted"
			, attrs.position
			, attrs.display? "visible": "hidden"
			, "popup"
			, ];

		return classes;
	}
}

export const popUp = new PopUp();
