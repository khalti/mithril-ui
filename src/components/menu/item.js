import {Base} from "./../base.js";
import enums from "./../../helpers/enums.js";
import keys from "lodash/keys";
import {required, within} from "validatex";


let fittedMap = {
	true: "fitted",
	vertically: "fitted vertically",
	horizontally: "fitted horizontally"
};

export class MenuItem extends Base {
	attrSchema = {
		color: [required(false), within(keys(enums.colorClassMap), "Invalid color.")],
		fitted: [required(false), within([true, "vertically", "horizontally"],
																		"^Invalid value for 'fitted'.")]
	}

	getDefaultAttrs ({attrs}) {
		return {
			root: attrs.href? "a": "div",
			rootAttrs: {
				href: attrs.href || ""
			}
		};
	}

	getClassList (attrs) {
		return ["item",
						enums.colorMap[attrs.color],
						fittedMap[attrs.fitted],
						attrs.header && "header",
						attrs.borderless && "borderless",
						attrs.active && "active",
						attrs.disabled && "disabled"
		];
	}
}


export const menuItem = new MenuItem();
