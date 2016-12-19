import _ from "mithril";
import component from "mithril-componentx";
import {required, within} from "validatex";
import {base} from "./../base.js";
import {modalPool} from "./pool.js";


const sizeMap = ["small", "large", "fullscreen"];

export const header = component({
	name: "modalHeader",
	base: base,
	getClassList (attrs) {
		return ["header"];
	},
	view ({attrs, children, state}) {
		return _("div", attrs.rootAttrs, children);
	}
});


export const content = component({
	name: "modalContent",
	base: base,
	attrSchema: {
		image: [required(false), within([true, false])]
	},
	getClassList (attrs) {
		return [
			{image: attrs.image},
			"content"
		];
	},
	view ({attrs, children, state}) {
		return _("div", attrs.rootAttrs, children);
	}
});


export const actions = component({
	name: "modalActions",
	base: base,
	getClassList (attrs) {
		return [
			"actions"
		];
	},
	view ({attrs, children, state}) {
		return _("div", attrs.rootAttrs, children);
	}
});


export const modal = component({
	name: "modal",
	base: base,
	attrSchema: {
		basic: [required(false), within([true, false])],
		size: [required(false), within(sizeMap)],
		scrolling: [required(false), within([true, false])]
	},
	remove () {
		modalPool.shift();
	},
	onremove (vdom) {
		this.remove();
	},
	getClassList (attrs) {
		return [
			"ui",
			{basic: attrs.basic},
			attrs.size,
			{scrolling: attrs.scrolling},
			"modal visible active"
		];
	},
	view ({attrs, children, state}) {
		return _("div", attrs.rootAttrs, children);
	}
});
