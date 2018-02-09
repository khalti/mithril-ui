import {UI} from "./../base.js";
import enums from "./../../helpers/enums.js";
import {required, within} from "validatex";
import {properKeys} from "./../../helpers/misc.js";

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

export class Menu extends UI {
	attrSchema = {
		state: [required(false), within(["down", "active"], "Invalid state.")],
		color: [required(false), within(properKeys(enums.colorMap), "Invalid color.")],
		fixed: [required(false), within(properKeys(fixedMap), "Invalid position to fix.")],
		itemCount: [required(false),
								within(properKeys(enums.numberMap), "Invalid item count.")],
		attach: [required(false), within(properKeys(enums.attachmentMap), "Invalid attachment.")],
		size: [required(false), within(properKeys(enums.sizeMap), "Invalid size.")],
		fitted: [required(false), within([true, "vertically", "horizontally"],
																		"Invalid value for 'fitted'.")]
	}

	getClassList ({attrs}) {
		return ["ui",
						attrs.secondary && "secondary",
						attrs.pointing && "pointing",
						attrs.tabular && "tabular",
						attrs.text && "text",
						attrs.vertical && "vertical",
						attrs.pagination && "pagination",
						attrs.state,
						fixedMap[attrs.fixed],
						attrs.inverted && "inverted",
						enums.colorMap[attrs.color],
						attrs.fluid && "fluid",
						attrs.compact && "compact",
						enums.numberMap[attrs.itemCount] && enums.numberMap[attrs.itemCount] + " item",
						enums.attachmentMap[attrs.attach],
						enums.sizeMap[attrs.size],
						fittedMap[attrs.fitted],
						attrs.icon && "icon",
						attrs.labeledIcon && "labeled icon",
						attrs.borderless && "borderless",
						enums.floatMap[attrs.float],
						"menu"];
	}
}
