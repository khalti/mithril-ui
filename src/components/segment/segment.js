import {Base} from "./../base.js";
import {
	attachmentMap,
	colorClassMap,
	emphasisMap,
	textAlignmentClassMap} from "./../../helpers/enums.js";
import keys from "lodash/keys";
import {required, within} from "validatex";


export class Segment extends Base {
	attrSchema = {
		attach: [required(false), within([true, "top", "bottop", "left", "right"],
																		"^Invalid attachment '{value}'.")],
		color: [required(false), within(keys(colorClassMap),
																		"Invalid color '{value}'.")],
		emphasis: [required(false), within(keys(emphasisMap),
																			"Invalid emphasis '{value}'.")],
		textAlignment: [required(false), within(keys(textAlignmentClassMap),
																						"Invalid text alignment '{value}'.")]
	}

	getClassList (attrs) {
		return ["ui",
						{raised: attrs.raised},
						{stacked: attrs.stacked},
						{piled: attrs.piled},
						{vertical: attrs.vertical},
						{disabled: attrs.disabled},
						{loading: attrs.loading},
						{inverted: attrs.inverted},
						{padded: attrs.padded},
						{compact: attrs.compact},
						{circular: attrs.circular},
						{clearing: attrs.clearing},
						{basic: attrs.basic},
						attachmentMap[attrs.attach],
						colorClassMap[attrs.color],
						emphasisMap[attrs.emphasis],
						textAlignmentClassMap[attrs.textAlignment],
						"segment"];
	}
}


export const segment = new Segment();
