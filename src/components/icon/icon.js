import {UI} from "./../base.js";
import _ from "mithril";
import {sizeMap, colorMap} from "./../../helpers/enums.js";
import {required, within, isString} from "validatex";


const states = ["loading", "disabled"];
const booleans = [true, false];
const flipMap = {
	horizontally: "horizontally flipped",
	vertically: "vertically flipped"
};
const rotateMap = {
	clockwise: "clockwise rotated",
	counterclockwise: "counterclockwise rotated"
};

export class Icon extends UI {
	attrSchema = {
		// TODO: make name required
		name: [required(false), isString()],
		fitted: [required(false), within(booleans)],
		size: [required(false), within(Object.keys(sizeMap))],
		state: [required(false), within(states)],
		link: [required(false), within(booleans)],
		flip: [required(false), within(Object.keys(flipMap))],
		rotate: [required(false), within(Object.keys(rotateMap))],
		circular: [required(false), within(booleans)],
		bordered: [required(false), within(booleans)],
		color: [required(false), within(Object.keys(colorMap))],
		inverted: [required(false), within(booleans)],
		corner: [required(false), within(booleans)],
	}

	getDefaultAttrs ({attrs}) {
		return {root: "i"};
	}

	getClassList ({attrs}) {
		return [
			attrs.fitted && "fitted",
			sizeMap[attrs.size],
			attrs.state,
			attrs.link && "link",
			colorMap[attrs.color],
			attrs.inverted && "inverted",
			attrs.corner && "corner",
			flipMap[attrs.flip],
			rotateMap[attrs.rotate],
			attrs.circular && "circular",
			attrs.bordered && "bordered",
			attrs.name,
			"icon",
		];
	}
}
