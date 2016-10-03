import component from "mithril-componentx";
import {base} from "./base.js";
import {within, required} from "validatex";
import m from "mithril";


export const sidebar = component({
	name: "sidebar",
	base: base,
	attrSchema: {
		inverted: [required(false), within([true])],
		vertical: [required(false), within([true])],
		menu: [required(false), within([true])],
		icon: [required(false), within([true])],
		labeled: [required(false), within([true])],
		direction: [required(true), within(["top", "right", "bottom", "left"])],
		width: [required(false), within(["thin", "very thin", "wide", "very wide"])],
		visible: [required(false), within([true, false])]
	},
	getClassList (attrs) {
		return [
			"ui",
			{inverted: attrs.inverted},
			{vertical: attrs.vertical},
			{menu: attrs.menu},
			{icon: attrs.menu},
			{labeled: attrs.labeled},
			attrs.direction,
			attrs.width,
			{"uncover": attrs.visible && attrs.direction === "left"},
			{"uncover": attrs.visible && attrs.direction === "right"},
			{"overlay": attrs.visible && attrs.direction === "top"},
			{"overlay": attrs.visible && attrs.direction === "bottom"},
			{"visible": attrs.visible},
			"sidebar"
		];
	},
	view ({attrs, children, state}) {
		return m("div", attrs.rootAttrs, children);
	}
});
