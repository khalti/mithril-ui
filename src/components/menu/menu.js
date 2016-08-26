import {base} from "./../base.js";
import component from "mithril-componentx";
import keys from "lodash/keys";
import enums from "./../../helpers/enums.js";

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
		state: {
			inclusion: {
				within: ["down", "active"],
				message: "^Invalid state."
			}	
		},
		color: {
			inclusion: {
				within: keys(enums.colorClassMap),
				message: "^Invalid color."
			}
		},
		fixed: {
			inclusion: {
				within: keys(fixedMap),
				message: "^Invalid position to fix."
			}
		},
		itemCount: {
			inclusion: {
				within: keys(enums.numberMap),
				message: "^Invalid item count."
			}
		},
		attach: {
			inclusion: {
				within: keys(enums.attachmentMap),
				message: "^Invalid attachment.."
			}
		},
		size: {
			inclusion: {
				within: keys(enums.sizeMap),
				message: "^Invalid size.."
			}
		},
		fitted: {
			inclusion: {
				within: [true, "vertically", "horizontally"],
				message: "^Invalid value for 'fitted'."
			}
		}
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
