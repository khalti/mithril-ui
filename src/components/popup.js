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
		, position: [required(true), isString(true)]
		, offSet: [required(false), isNumber(true)]
		, visible: [required(true), isBoolean(true)]
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
			, attrs.visible? "visible": "hidden"
			, "popup"
			, ];

		return classes;
	}
}

export const popup = new Popup();


export class PopupBinder extends UI {
	attrSchema =
		{ displayPopup: [required(true), isString(true)]
		, hidePopup: [required(true), isString(true)]
	 	, }

	oninit (vnode) {
		this.popupCache = this.getPopup(vnode);
	}

	onbeforeremove (vnode) {
		PopupPool.remove(this.popupCache);
	}

	getPopup (vnode) {
		return vnode.children[1];
	}

	displayPopup () {
		if (this.popupCache.attrs.visible === undefined) {
			PopupPool.add(this.popupCache);
		}

		this.popupCache.attrs.visible = true;
	}

	hidePopup () {
		this.popupCache.attrs.visible = false;
	}

	togglePopupDisplay () {
		if (!this.popupCache.attrs.visible) {
			this.displayPopup();
		}
		else {
			this.hidePopup();
		}
	}

	view ({attrs, children, state}) {
		if (children.length !== 2) throw Error("Please pass a popup and triggerer.");

		let parentVdom = children[0];
		let parentAttrs = parentVdom.attrs;

		if (attrs.displayPopup === attrs.hidePopup) {
			parentVdom.attrs[attrs.displayPopup] = (e) => {
				this.togglePopupDisplay();
			}
		}
		else {
			parentVdom.attrs[attrs.displayPopup] = this.displayPopup.bind(this);
			parentVdom.attrs[attrs.hidePopup] = this.hidePopup.bind(this);
		}

		return parentVdom;
	}
}

export const popupBinder = new PopupBinder();


export class PopupPool extends UI {
	static popups = [];

	static add (popup) {
		PopupPool.popups = PopupPool.popups.concat([popup]);
	}

	static remove (popup) {
		PopupPool.popups = PopupPool.popups.filter((apopup) => {
			return apopup !== popup;
		});
	}

	view ({attrs, children, state}) {
		return o("div", attrs.rootAttrs, PopupPool.popups.map((popup) => {
			return Object.assign({}, popup);
		}));
	}
}

export const popupPool = new PopupPool();
