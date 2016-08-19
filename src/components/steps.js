import component from "mithril-componentx";
import {base} from "./base.js";
import enum from "./../helpers/enums.js";
import keys from "lodash/keys";

export const steps = component({
	base: base,
	attrSchema: {
		attach: {
			inclusion: {
				within: keys(enum.attachmentMap),
				message: "Invalid value for attachment."
			}
		},
		count: {
			inclusion: {
				within: enum.properKeys(enum.numberMap),
				message: "Invalid value for count."
			}
		},
		size: {
			inclusion: {
				within: keys(enum.sizeMap),
				message: "Invalid value for size."
			}
		}
	},
	getClassList (attrs) {
		return [
			"ui",
			{ordered: attrs.ordered},
			{vertical: attrs.vertical},
			{fluid: attrs.fluid},
			enum.attachmentMap[attrs.attach],
			enum.numberMap[attrs.count],
			enum.sizeMap[attrs.size],
			"steps"
		];
	}
});
