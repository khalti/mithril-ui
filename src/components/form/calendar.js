import {UI} from "./../base.js";
import o from "mithril";
import {Calendar as Cal} from "calendar";
import {Field} from "./field.js";
import {required, isString} from "validatex";
import {popup} from "./../popup.js";


export class Calendar extends UI {
	// attrSchema =
	// 	{ model: required(true)
	// 	, format: [required(false), isString(true)]
	// 	, }

	getDefaultAttrs (vnode) {
		let defaultAttrs =
			{format: "YYYY-MM-DD"};
		let attrs = Object.assign(super.getDefaultAttrs(vnode), defaultAttrs);
		return attrs;
	}

	view ({attrs, state, children}) {
		return o("div", attrs.rootAttrs, children);
	}
}


export const calendar = new Calendar();
