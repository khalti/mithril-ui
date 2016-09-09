import component from "mithril-componentx";
import {base} from "./../components/base.js";
import m from "mithril";
import {attachmentMap, colorClassMap, sizeMap} from "./../helpers/enums.js";
import keys from "lodash/keys";
import {required, within} from "validatex";


let types = ["warning", "info", "positive", "success", "negative", "error"];

let states = ["hidden", "visible"];

export const message = component({
	base: base,
	visible: false,
	attrSchema: {
		attach: [required(false), within(keys(attachmentMap),
																		"^Invalid attachment '{value}'.")],
		type: [required(false), within(types, "Invalid type '{value}'.")],
		color: [required(false), within(keys(colorClassMap), "Invalid color '{value}'.")],
		size: [required(false), within(keys(sizeMap), "Invalid size '{value}'.")],
		state: [required(false), within(states, "Invalid state '{value}'.")]
	},
	getDefaultAttrs (attrs) {
		return {};
	},
	dismiss (e) {
		this.visible = false;
	},
	getState (attrs) {
		if (attrs.state) return attrs.state;
		return this.visible? "visible": "hidden";
	},
	getClassList (attrs) {
		let self = this;
		return ["ui",
						{icon: attrs.icon},
						this.getState(attrs),
						{floating: attrs.floating},
						{compact: attrs.compact},
						{warning: attrs.warning},
						attrs.type,
						attachmentMap[attrs.attach],
						colorClassMap[attrs.color],
						sizeMap[attrs.size],
						"message"];
	},
	view (vnode) {
		let children = vnode.children || [];

		if (vnode.attrs.icon) {
			children = [vnode.attrs.icon, vnode.attrs.content];
		}

		if (vnode.attrs.dismissable) {
			children.unshift(m("i.close.icon", {onclick: this.dismiss.bind(this)}));
		}

		return m("div", vnode.attrs.rootAttrs, children);
	}
});
