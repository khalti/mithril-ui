import component from "mithril-componentx";
import {base} from "./../components/base.js";
import m from "mithril";
import {attachmentMap, colorClassMap, sizeMap} from "./../helpers/enums.js";
import keys from "lodash/keys";


let types = ["warning", "info", "positive", "success", "negative", "error"];

let states = ["hidden", "visible"];

export const message = component({
	base: base,
	visible: false,
	attrSchema: {
		attach: {inclusion: {within: keys(attachmentMap),
												 message: "^Invalid attachment '%{value}'."}},
		type: {inclusion: {within: types,
											 message: "^Invalid type '%{value}'."}},
		color: {inclusion: {within: keys(colorClassMap),
												message: "^Invalid color '%{value}'."}},
		size: {inclusion: {within: keys(sizeMap),
											 message: "^Invalid size '%{value}'."}},
		state: {inclusion: {within: states,
												message: "^Invalid state '%{value}'."}}
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

		return m("div", vnode.attrs.dom, children);
	}
});
