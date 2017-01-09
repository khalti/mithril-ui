import {UI} from "./../base.js";
import {properKeys} from "./../../helpers/misc.js";
import enums from "./../../helpers/enums.js";
import clone from "lodash/clone";
import {required, within} from "validatex";


export class Column extends UI {
	attrSchema = {
		float: [required(false),
						within(Object.keys(enums.floatMap), "Invalid value '{value}'.")],
		width: [required(false),
						within(properKeys(enums.widthMap), "Invalid value '{value}'")],
		color: [required(false),
						within(Object.keys(enums.colorMap), "Invalid value '{value}'.")],
		textAlignment: [required(false),
										within(Object.keys(enums.textAlignmentMap), "Invalid value '{value}'.")],
		// visible: {inclusion: {within: enums.devices,
		// 											message: "^Invalid value '%{value}'."}},
		mobile: [required(false),
						within(properKeys(enums.widthMap), "Invalid value '{value}'.")],
		tablet: [required(false),
						within(properKeys(enums.widthMap), "Invalid value '{value}'.")],
		computer: [required(false),
							within(properKeys(enums.widthMap), "Invalid value '{value}'.")],
		largeScreen: [required(false),
									within(properKeys(enums.widthMap), "Invalid value '{value}'.")],
		widescreen: [required(false),
								within(properKeys(enums.widthMap), "Invalid value '{value}'.")]
	}

	getClassList ({attrs}) {
		let visibleClass;
		let visibility = clone(attrs.visible || []);
		if (visibility.length > 0) {
			visibleClass = visibility.reduce((className, device) => {
				return `${className} ${enums.deviceMap[device]}`;
			})
		}

		return [enums.floatMap[attrs.float],
						enums.widthMap[attrs.width],
						enums.colorMap[attrs.color],
						enums.textAlignmentMap[attrs.textAlignment],
						visibleClass? visibleClass + " only": "",
						attrs.mobile? enums.widthMap[attrs.mobile] + " mobile": "",
						attrs.tablet? enums.widthMap[attrs.tablet] + " tablet": "",
						attrs.computer? enums.widthMap[attrs.computer] + " computer": "",
						attrs.largeScreen? enums.widthMap[attrs.largeScreen] + " large screen": "",
						attrs.widescreen? enums.widthMap[attrs.widescreen] + " widescreen": "",
						"column"];
	}
}


export const column = new Column();
