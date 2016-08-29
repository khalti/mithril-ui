import {base} from "./../base.js";
import component from "mithril-componentx";
import enums from "./../../helpers/enums.js";
import keys from "lodash/keys";


let fittedMap = {
	true: "fitted",
	vertically: "fitted vertically",
	horizontally: "fitted horizontally"
};

export const item = component({
	base: base,
	attrSchema: {
		color: {
			inclusion: {
				within: keys(enums.colorClassMap),
				message: "^Invalid color."
			}
		},
		fitted: {
			inclusion: {
				within: [true, "vertically", "horizontally"],
				message: "^Invalid value for 'fitted'."
			}
		}
	},
	getDefaultAttrs (attrs) {
		return {
			root: attrs.href? "a": "div",
			rootAttrs: {
				href: attrs.href || ""
			}
		};
	},
	getClassList (attrs) {
		return ["item",
						enums.colorClassMap[attrs.color],
						fittedMap[attrs.fitted],
						{header: attrs.header},
						{borderless: attrs.borderless}
		];
	}
});
