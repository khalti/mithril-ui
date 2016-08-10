import {base} from "./base.js";
import component from "mithril-componentx";
import {attachmentMap, colorClassMap, emphasisMap, textAlignmentClassMap} from "./../helpers/enums.js";
import keys from "lodash/keys";

export const segment = component({
	base: base,
	attrSchema: {
		attach: {inclusion: {within: keys(attachmentMap),
												 message: "^Invalid attachment '%{value}'."}},
		color: {inclusion: {within: keys(colorClassMap),
												message: "^Invalid color '%{value}'."}},
		emphasis: {inclusion: {within: keys(emphasisMap),
													 message: "^Invalid emphasis '%{value}'."}},
		textAlignment: {inclusion: {within: keys(textAlignmentClassMap),
												message: "^Invalid text alignment '%{value}'."}}
	},
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
});
