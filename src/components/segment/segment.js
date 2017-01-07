import {Base} from "./../base.js";
import {
	attachmentMap,
	colorMap,
	emphasisMap,
	textAlignmentMap} from "./../../helpers/enums.js";
import {required, within} from "validatex";


export class Segment extends Base {
	attrSchema = {
		attach: [required(false), within([true, "top", "bottop", "left", "right"],
																		"^Invalid attachment '{value}'.")],
		color: [required(false), within(Object.keys(colorMap),
																		"Invalid color '{value}'.")],
		emphasis: [required(false), within(Object.keys(emphasisMap),
																			"Invalid emphasis '{value}'.")],
		textAlignment: [required(false), within(Object.keys(textAlignmentMap),
																						"Invalid text alignment '{value}'.")]
	}

	getClassList ({attrs}) {
		return ["ui",
						attrs.raised && "raised",
						attrs.stacked && "stacked",
						attrs.piled && "piled",
						attrs.vertical && "vertical",
						attrs.disabled && "disabled",
						attrs.loading && "loading",
						attrs.inverted && "inverted",
						attrs.padded && "padded",
						attrs.compact && "compact",
						attrs.circular && "circular",
						attrs.clearing && "clearing",
						attrs.basic && "basic",
						attachmentMap[attrs.attach],
						colorMap[attrs.color],
						emphasisMap[attrs.emphasis],
						textAlignmentMap[attrs.textAlignment],
						"segment"];
	}
}


export const segment = new Segment();
