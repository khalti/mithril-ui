import {base} from "./../base.js";
import component from "mithril-componentx";
import enums from "./../../helpers/enums.js";
import keys from "lodash/keys";
import {required, within} from "validatex";


let fittedMap = {
	true: "fitted",
	vertically: "fitted vertically",
	horizontally: "fitted horizontally"
};

export const item = component({
	base: base,
	attrSchema: {
		color: [required(false), within(keys(enums.colorClassMap), "Invalid color.")],
		fitted: [required(false), within([true, "vertically", "horizontally"],
																		"^Invalid value for 'fitted'.")]
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
