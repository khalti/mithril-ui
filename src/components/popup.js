import {UI} from "./base.js";
import o from "mithril";
import {required, isBoolean, isArray, within, isString, isNumber} from "validatex";
import {sizeMap} from "./../helpers/enums.js";

const WIDTHS = ["wide", "very wide"];

export class Popup extends UI {
	attrSchema =
		{ basic: [required(false), isBoolean(true)]
		, width: [required(false), within(WIDTHS)]
		, fluid: [required(false), isBoolean(true)]
		, size: [required(false), within(Object.keys(sizeMap))]
		, flowing: [required(false), isBoolean(true)]
		, inverted: [required(false), isBoolean(true)]
		, position: [required(false), isString(true)]
		, offSet: [required(false), isNumber(true)]
		, display: [required(true), isBoolean(true)]
		, }

	getClassList ({attrs}) {
		let classes =
			[ "ui"
			, attrs.basic && "basic"
			, attrs.width
			, attrs.fluid && "fluid"
			, sizeMap[attrs.size]
			, attrs.flowing && "flowing"
			, attrs.inverted && "inverted"
			, attrs.position
			, attrs.display? "visible": "hidden"
			, "popup"
			, ];

		return classes;
	}
}

export const popup = new Popup();


export class PopupBinder extends UI {
	oninit (vnode) {
		super.oninit(vnode);
		this.displayPopup = false;
	}

	toggleDisplayPopup () {
		this.displayPopup = !this.displayPopup;
	}

	view ({attrs, children, state}) {
		if (children.length !== 2) throw Error("Please pass a popup and triggerer.");

		let popupVdom, parentVdom;
		if (children[1].tag instanceof Popup) {
			popupVdom = children[1];
			parentVdom = children[0];
		}
		else {
			popupVdom = children[0];
			parentVdom = children[1];
		}

		popupVdom.attrs.display = this.displayPopup;

		let parentStyle = parentVdom.attrs.style || {};

		parentVdom.children.push(popupVdom);
		parentVdom.attrs.onclick = this.toggleDisplayPopup.bind(this);
		parentVdom.attrs.style = Object.assign(parentStyle, {position: "relative"});

		return parentVdom;
	}
}

export const popupBinder = new PopupBinder();
