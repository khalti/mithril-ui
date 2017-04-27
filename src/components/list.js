import {UI} from "./base.js";
import {required, isBoolean} from "validatex";
import {sizeMap, verticalAlignmentMap, floatMap} from "./../helpers/enums.js";

const TYPES = ["bulleted", "ordered", "link"];

export class Content extends UI {
	displayName = "ListItemContent"

	getClassList (vnode) {
		return ["content"];
	}
}

export class Header extends UI {
	displayName = "ListItemHeader"

	attrSchema =
		{ href: required(false) }

	getDefaultAttrs (vnode) {
		let defaultAttrs = super.getDefaultAttrs(vnode);
		let {attrs} = vnode;

		if (attrs.href) {
			defaultAttrs.root = "a";
			defaultAttrs.href = attrs.href;
		}

		return defaultAttrs;
	}

	getClassList (vnode) {
		return ["header"];
	}
}

export class Description extends UI {
	displayName = "ListItemDescription"

	getClassList (vnode) {
		return ["description"];
	}
}


export class Item extends UI {
	displayName = "ListItem"

	getClassList (vnode) {
		return ["item"];
	}
}

Item.Content = Content;
Item.Header = Header;
Item.Description = Description;


export class List extends UI {
	attrSchema =
		{ type: [required(false), within(TYPES)]
		, horizontal: [required(false), isBoolean(true)]
		, inverted: [required(false), isBoolean(true)]
		, selection: [required(false), isBoolean(true)]
		, animated: [required(false), isBoolean(true)]
		, relaxed: [required(false), isBoolean(true)]
		, divided: [required(false), isBoolean(true)]
		, celled: [required(false), isBoolean(true)]
		, size: [required(false), within(sizeMap)]
		, verticalAlignment: [required(false), within(verticalAlignmentMap)]
		, float: [required(false), within(floatMap)]
		, }

	getClassList (vnode) {
		return ["ui", "list"];
	}
}


List.Item = Item;


