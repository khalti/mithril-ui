import {UI} from "./base.js";
import o from "mithril";
import {required, isBoolean, isArray, within, isString, isNumber} from "validatex";
import {sizeMap} from "./../helpers/enums.js";
import {includes} from "lodash";
import getSize from "get-size";

const WIDTHS = ["wide", "very wide"];

const POSITIONS =
	[ "top left"
	, "top center"
	, "top right"
	, "right center"
	, "bottom right"
	, "bottom center"
	, "bottom left"
	, "left center" ];

function getElCord (el) {
	let box = el.getBoundingClientRect();
	let pageXOffset = window.pageXOffset;
	let pageYOffset = window.pageYOffset;

	return {
		top: box.top + pageYOffset,
		right: box.right + pageXOffset,
		bottom: box.bottom + pageYOffset,
		left: box.left + pageXOffset
	};
}


export class Popup extends UI {
	attrSchema =
		{ basic: [required(false), isBoolean(true)]
		, width: [required(false), within(WIDTHS)]
		, fluid: [required(false), isBoolean(true)]
		, size: [required(false), within(Object.keys(sizeMap))]
		, flowing: [required(false), isBoolean(true)]
		, inverted: [required(false), isBoolean(true)]
		, position: [required(true), within(POSITIONS)]
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

	oncreate (vnode) {
		super.oncreate();
		this.updatePosition(vnode);
	}

	updatePosition (vnode) {
		let popupDom = vnode.dom;
		let triggererDom = vnode.attrs.triggererDom;
		let popupPosition = vnode.attrs.position;
		let triggererCord = getElCord(triggererDom);
		let triggererSize = getSize(triggererDom);
		let popupSize = getSize(popupDom);
		let style = {};

		if (includes(popupPosition, "top")) {
			style.top =
				triggererCord.top - popupSize.outerHeight + "px";
		}
		else if (includes(popupPosition, "bottom")) {
			style.top = triggererCord.bottom + "px";
		}
		else {
			style.top = triggererCord.top + triggererSize.height/2 - popupSize.height/2 + "px";
		}

		if (includes(popupPosition, "left")) {
			popupPosition === "left center"
				? style.left = triggererCord.left - popupSize.outerWidth + "px"
				: style.left = triggererCord.left + "px";
		}
		else if (includes(popupPosition, "right")) {
			popupPosition === "right center"
				? style.left = triggererCord.right + "px"
				: style.left = triggererCord.right - popupSize.outerWidth + "px";
		}
		else {
			style.left = triggererCord.left + triggererSize.width/2 - popupSize.width/2 + "px";
		}

		style.right = "auto";

		Object.assign(popupDom.style, style);
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
		this.popupCache.attrs.oncreate = (vnode) => {
			this.popupCache.dom = vnode.dom;
			vnode.attrs.triggererDom = this.popupCache.attrs.triggererDom;
		}
		this.popupCache.attrs.onbeforeupdate = (vnode) => {
			this.updatePopupVdom(vnode);
		}
	}

	oncreate (vnode) {
		super.oncreate(vnode);
		this.popupCache.attrs.triggererDom = vnode.children[0].dom;
	}

	updatePopupVdom (vnode) {
		vnode.attrs.visible = this.popupCache.attrs.visible;
		this.popupCache.attrs = vnode.attrs;
		this.popupCache.children = vnode.children;
		this.popupCache.state = vnode.state;
		this.popupCache.instance = vnode.instance;
	}

	getPopup (vnode) {
		return vnode.children[1];
	}

	displayPopup (eventHandler) {
		eventHandler && eventHandler();
		if (this.popupCache.attrs.visible === undefined) {
			PopupPool.add(this.popupCache);
		}

		this.popupCache.attrs.visible = true;
	}

	hidePopup (eventHandler) {
		eventHandler && eventHandler();
		this.popupCache.attrs.visible = false;
	}

	togglePopupDisplay (eventHandler) {
		eventHandler && eventHandler();
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
			let originalEventHandler = parentVdom.attrs[attrs.displayPopup];
			parentVdom.attrs[attrs.displayPopup] = this.togglePopupDisplay.bind(this, originalEventHandler);
		}
		else {
			let originalEventHandler1 = parentVdom.attrs[attrs.displayPopup];
			let originalEventHandler2 = parentVdom.attrs[attrs.hidePopup];
			parentVdom.attrs[attrs.displayPopup] = this.displayPopup.bind(this, originalEventHandler1);
			parentVdom.attrs[attrs.hidePopup] = this.hidePopup.bind(this, originalEventHandler2);
		}

		let onbeforeremove = parentVdom.attrs.onbeforeremove;
		parentVdom.attrs.onremove = (vnode) => {
			onbeforeremove && onbeforeremove();
			PopupPool.remove(this.popupCache);
		}

		return parentVdom;
	}
}

export const popupBinder = new PopupBinder();


export class PopupPool extends UI {
	static popups = [];

	oncreate (vnode) {
		this.listener = window.addEventListener("resize", () => {
			PopupPool.popups.forEach((popup) => {
				let instance = popup.tag;
				instance.updatePosition.call(popup.state, popup);
			});
		});
	}

	onbeforeremove (vnode) {
		window.removeEventListener("resize", this.listener);
	}

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
