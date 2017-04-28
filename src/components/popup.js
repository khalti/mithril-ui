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

export class PopupBinder extends UI {
	attrSchema =
		{ displayPopup: [required(true), isString(true)]
		, hidePopup: [required(true), isString(true)]
		, popupIsVisible: [required(false), isBoolean(true)]
	 	, }

	oninit (vnode) {
		this.popupAttached = false;
		this.popupCache = this.getPopup(vnode);
		this.popupCache.attrs.oncreate = (vnode) => {
			this.popupCache.dom = vnode.dom;
			this.popupCache.instance = vnode.instance;
		}
		this.popupCache.attrs.onbeforeupdate = (vnode) => {
			this.popupCache.dom = vnode.dom;
			this.popupCache.instance = vnode.instance;
		}
	}

	onbeforeupdate (vnode) {
		let popup = this.getPopup(vnode);
		popup.attrs.visible = vnode.attrs.popupIsVisible === undefined
			? this.popupCache.attrs.visible
			: vnode.attrs.popupIsVisible;
		popup.attrs.triggererDom = this.popupCache.attrs.triggererDom;
		popup.attrs.oncreate = this.popupCache.attrs.oncreate;
		popup.attrs.onbeforeupdate = this.popupCache.attrs.onbeforeupdate;
		popup.attrs.onupdate = this.popupCache.attrs.onupdate;
		this.popupCache.attrs = popup.attrs;
		this.popupCache.children = popup.children;
		this.popupCache.state = popup.state;

		if (vnode.attrs.popupIsVisible && !this.popupAttached) {
			this.displayPopup();
		}
	}

	oncreate (vnode) {
		super.oncreate(vnode);
		this.popupCache.attrs.triggererDom = vnode.children[0].dom;

		if (vnode.attrs.popupIsVisible) {
			this.displayPopup();
		}
	}

	getPopup (vnode) {
		return vnode.children[1];
	}

	unwatchDefocus () {
		document.body.removeEventListener("click", this.bindedDefocusWatcher);
	}

	defocusWatcher (e) {
		this.hidePopup(undefined, e);
		o.redraw();
	}

	watchDefocus () {
		this.bindedDefocusWatcher = this.defocusWatcher.bind(this);
		document.body.addEventListener("click", this.bindedDefocusWatcher);
	}

	displayPopup (eventHandler, e) {
		e.stopPropagation();

		eventHandler && eventHandler();
		if (!this.popupAttached) {
			PopupPool.add(this.popupCache);
			this.popupAttached = true;
		}

		this.popupCache.attrs.visible = true;
		this.watchDefocus();
	}

	hidePopup (eventHandler, e) {
		e.stopPropagation();

		eventHandler && eventHandler();
		this.popupCache.attrs.visible = false;
		this.unwatchDefocus();
	}

	togglePopupDisplay (eventHandler, e) {
		if (!this.popupCache.attrs.visible) {
			this.displayPopup(eventHandler, e);
		}
		else {
			this.hidePopup(eventHandler, e);
		}
	}

	onbeforeremove (vnode) {
		document.body.removeEventListener("click", this.bindedDefocusWatcher);
	}

	view ({attrs, children, state}) {
		if (children.length !== 2) throw Error("Please pass a popup and triggerer.");

		let triggererVdom = children[0];
		let parentAttrs = triggererVdom.attrs;

		if (attrs.displayPopup === attrs.hidePopup) {
			let originalEventHandler = triggererVdom.attrs[attrs.displayPopup];
			triggererVdom.attrs[attrs.displayPopup] = this.togglePopupDisplay.bind(this, originalEventHandler);
		}
		else {
			let originalEventHandler1 = triggererVdom.attrs[attrs.displayPopup];
			let originalEventHandler2 = triggererVdom.attrs[attrs.hidePopup];
			triggererVdom.attrs[attrs.displayPopup] = this.displayPopup.bind(this, originalEventHandler1);
			triggererVdom.attrs[attrs.hidePopup] = this.hidePopup.bind(this, originalEventHandler2);
		}

		let onbeforeremove = triggererVdom.attrs.onbeforeremove;
		triggererVdom.attrs.onremove = (vnode) => {
			onbeforeremove && onbeforeremove();
			PopupPool.remove(this.popupCache);
		}

		return triggererVdom;
	}
}

export class PopupPool extends UI {
	static popups = [];

	reposition (e) {
		PopupPool.popups.forEach((popup) => {
			let instance = new popup.tag();
			instance.updatePosition.call(popup.state, popup);
		});
	}

	oncreate (vnode) {
		window.addEventListener("resize", this.reposition);
	}

	onbeforeremove (vnode) {
		window.removeEventListener("resize", this.reposition);
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
