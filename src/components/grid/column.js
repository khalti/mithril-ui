import {Base} from "./../base.js";
import keys from "lodash/keys";
import reduce from "lodash/reduce";
import enums from "./../../helpers/enums.js";
import component from "mithril-componentx";
import clone from "lodash/clone";
import {required, within} from "validatex";


export class Column extends Base {
	attrSchema = {
		float: [required(false),
						within(keys(enums.floatMap), "Invalid value '{value}'.")],
		width: [required(false),
						within(enums.properKeys(enums.widthClassMap), "Invalid value '{value}'")],
		color: [required(false),
						within(keys(enums.colorClassMap), "Invalid value '{value}'.")],
		textAlignment: [required(false),
										within(keys(enums.textAlignmentClassMap), "Invalid value '{value}'.")],
		// visible: {inclusion: {within: enums.devices,
		// 											message: "^Invalid value '%{value}'."}},
		mobile: [required(false),
						within(enums.properKeys(enums.widthClassMap), "Invalid value '{value}'.")],
		tablet: [required(false),
						within(enums.properKeys(enums.widthClassMap), "Invalid value '{value}'.")],
		computer: [required(false),
							within(enums.properKeys(enums.widthClassMap), "Invalid value '{value}'.")],
		largeScreen: [required(false),
									within(enums.properKeys(enums.widthClassMap), "Invalid value '{value}'.")],
		widescreen: [required(false),
								within(enums.properKeys(enums.widthClassMap), "Invalid value '{value}'.")]
	}

	getClassList (attrs) {
		let visibleClass;
		let visibility = clone(attrs.visible || []);
		if (visibility.length > 0) {
			visibleClass = reduce(visibility, (className, device) => {
				return `${className} ${enums.deviceMap[device]}`;
			})
		}

		return [enums.floatMap[attrs.float],
						enums.widthClassMap[attrs.width],
						enums.colorClassMap[attrs.color],
						enums.textAlignmentClassMap[attrs.textAlignment],
						visibleClass? visibleClass + " only": "",
						attrs.mobile? enums.widthClassMap[attrs.mobile] + " mobile": "",
						attrs.tablet? enums.widthClassMap[attrs.tablet] + " tablet": "",
						attrs.computer? enums.widthClassMap[attrs.computer] + " computer": "",
						attrs.largeScreen? enums.widthClassMap[attrs.largeScreen] + " large screen": "",
						attrs.widescreen? enums.widthClassMap[attrs.widescreen] + " widescreen": "",
						"column"];
	}
}


export const column = new Column();
