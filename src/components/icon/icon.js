import {base} from "./../base.js";
import component from "mithril-componentx";
import m from "mithril";
import omit from "lodash/omit";
import keys from "lodash/keys";
import {sizeMap, colorClassMap} from "./../../helpers/enums.js";
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

export const icon = component({
	name: "icon",
	base: base,
	attrSchema: {
		// TODO: make name required
		name: [required(false), isString()],
		fitted: [required(false), within(booleans)],
		size: [required(false), within(keys(sizeMap))],
		state: [required(false), within(states)],
		link: [required(false), within(booleans)],
		flip: [required(false), within(keys(flipMap))],
		rotate: [required(false), within(keys(rotateMap))],
		circular: [required(false), within(booleans)],
		bordered: [required(false), within(booleans)],
		color: [required(false), within(keys(colorClassMap))],
		inverted: [required(false), within(booleans)],
		corner: [required(false), within(booleans)],
	},
	getDefaultAttrs () {
		return {root: "i"};
	},
	getClassList (attrs) {
		return [
			{fitted: attrs.fitted},
			attrs.size,
			attrs.state,
			{link: attrs.link},
			attrs.color,
			{inverted: attrs.inverted},
			{corner: attrs.corner},
			attrs.name,
			"icon",
		];
	},
  view (vnode) {
		let attrs = vnode.attrs;

    return m(attrs.root, attrs.rootAttrs, vnode.children);
  }
});
