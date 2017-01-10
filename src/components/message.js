import {UI} from "./../components/base.js";
import _ from "mithril";
import {attachmentMap, colorMap, sizeMap} from "./../helpers/enums.js";
import {required, within, isFunction} from "validatex";
import {is, componentIs} from "./../helpers/misc.js";
import {icon, Icon} from "./icon/icon.js";
import {isArray} from "./../helpers/type.js";


let types = ["warning", "info", "positive", "success", "negative", "error"];

let states = ["hidden", "visible"];

export class Message extends UI {
	visible = false

	attrSchema = {
		attach: [required(false), within(Object.keys(attachmentMap),
																		"^Invalid attachment '{value}'.")],
		type: [required(false), within(types, "Invalid type '{value}'.")],
		color: [required(false), within(Object.keys(colorMap), "Invalid color '{value}'.")],
		size: [required(false), within(Object.keys(sizeMap), "Invalid size '{value}'.")],
		state: [required(false), within(states, "Invalid state '{value}'.")],
		onDismiss: [required(false), isFunction(true)]
	}

	getClassList ({attrs, children = []}) {
		if (!isArray(children)) {
			children = [children];
		}

		return ["ui",
						children.some((child) => child && is(child.tag, Icon)) && "icon",
						attrs.state,
						attrs.floating && "floating",
						attrs.compact && "compact",
						attrs.warning && "warning",
						attrs.type,
						attachmentMap[attrs.attach],
						colorMap[attrs.color],
						sizeMap[attrs.size],
						"message"];
	}

	view ({attrs, children = [], state}) {
		if (attrs.onDismiss) {
			children.unshift(_(icon, {name: "close", onclick: attrs.onDismiss}));
		}

		return _("div", attrs.rootAttrs, children);
	}
}

export const message = new Message();


export class MessageHeader extends UI {
	getClassList ({attrs}) {
		return ["header"];
	}
}

export const messageHeader = new MessageHeader();

export class MessageContent extends UI {
	getClassList ({attrs}) {
		return ["content"];
	}
}

export const messageContent = new MessageContent();
