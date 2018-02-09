import {UI} from "./base.js";
import {required, isBoolean, within, } from "validatex";
import {sizeMap, verticalAlignmentMap, floatMap} from "./../helpers/enums.js";

const TYPES = ["bulleted", "ordered", "link"];

class Content extends UI {
	static displayName = "ListItemContent"

	getClassList (vnode) {
		return ["content"];
	}
}

class Header extends UI {
	static displayName = "ListItemHeader"

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

class Description extends UI {
	static displayName = "ListItemDescription"

	getClassList (vnode) {
		return ["description"];
	}
}


class Item extends UI {
	static displayName = "ListItem"

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

	getClassList ({attrs, state, children}) {
		let classes =
			[ "ui"
			, attrs.horizontal && "horizontal"
			, attrs.inverted && "inverted"
			, attrs.selection && "selection"
			, attrs.animated && "animated"
			, attrs.relaxed && "relaxed"
			, attrs.divided && "divided"
			, attrs.celled && "celled"
			, sizeMap[attrs.size]
			, verticalAlignmentMap[attrs.verticalAlignment]
			, floatMap[attrs.float]
			, "list"
			]

		return classes;
	}
}


List.Item = Item;


