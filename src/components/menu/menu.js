import {base} from "./../base.js";
import component from "mithril-componentx";
import keys from "lodash/keys";
import enums from "./../../helpers/enums.js";
import {required, within} from "validatex";

let fixedMap = {
	top: "top fixed",
	bottom: "bottom fixed",
	left: "left fixed",
	right: "right fixed"
};

let fittedMap = {
	true: "fitted",
	vertically: "fitted vertically",
	horizontally: "fitted horizontally"
};

export const menu = component({
	base: base,
	attrSchema: {
		state: [required(false), within(["down", "active"], "Invalid state.")],
		color: [required(false), within(keys(enums.colorClassMap), "Invalid color.")],
		fixed: [required(false), within(keys(fixedMap), "Invalid position to fix.")],
		itemCount: [required(false),
								within(enums.properKeys(enums.numberMap), "Invalid item count.")],
		attach: [required(false), within(keys(enums.attachmentMap), "Invalid attachment.")],
		size: [required(false), within(keys(enums.sizeMap), "Invalid size.")],
		fitted: [required(false), within([true, "vertically", "horizontally"],
																		"Invalid value for 'fitted'.")]
	},
	getClassList (attrs) {
		return ["ui",
						{secondary: attrs.secondary},
						{pointing: attrs.pointing},
						{tabular: attrs.tabular},
						{text: attrs.text},
						{vertical: attrs.vertical},
						{pagination: attrs.pagination},
						attrs.state,
						fixedMap[attrs.fixed],
						{inverted: attrs.inverted},
						enums.colorClassMap[attrs.color],
						{fluid: attrs.fluid},
						{compact: attrs.compact},
						enums.numberMap[attrs.itemCount],
						enums.attachmentMap[attrs.attach],
						enums.sizeMap[attrs.size],
						fittedMap[attrs.fitted],
						{icon: attrs.icon},
						{"labeled icon": attrs.labeledIcon},
						{borderless: attrs.borderless},
						"menu"];
	}
});
