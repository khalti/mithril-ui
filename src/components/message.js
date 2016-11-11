import component from "mithril-componentx";
import {base} from "./../components/base.js";
import m from "mithril";
import {attachmentMap, colorClassMap, sizeMap} from "./../helpers/enums.js";
import keys from "lodash/keys";
import {required, within, isFunction} from "validatex";
import {componentIs} from "./../helpers/misc.js";


let types = ["warning", "info", "positive", "success", "negative", "error"];

let states = ["hidden", "visible"];

export const message = component({
	name: "message",
	base: base,
	visible: false,
	attrSchema: {
		attach: [required(false), within(keys(attachmentMap),
																		"^Invalid attachment '{value}'.")],
		type: [required(false), within(types, "Invalid type '{value}'.")],
		color: [required(false), within(keys(colorClassMap), "Invalid color '{value}'.")],
		size: [required(false), within(keys(sizeMap), "Invalid size '{value}'.")],
		state: [required(false), within(states, "Invalid state '{value}'.")],
		icon: [required(false), componentIs("icon")],
		content: [required(true)],
		onDismiss: [required(false), isFunction(true)]
	},
	getClassList (attrs) {
		let self = this;
		return ["ui",
						{icon: attrs.icon},
						attrs.state,
						{floating: attrs.floating},
						{compact: attrs.compact},
						{warning: attrs.warning},
						attrs.type,
						attachmentMap[attrs.attach],
						colorClassMap[attrs.color],
						sizeMap[attrs.size],
						"message"];
	},
	view ({attrs, children, state}) {
		let body = [attrs.icon, attrs.content];

		if (attrs.onDismiss) {
			body.unshift(m("i.close.icon", {onclick: attrs.onDismiss}));
		}

		return m("div", attrs.rootAttrs, body);
	}
});
