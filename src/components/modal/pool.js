import _ from "mithril";
import {required, within} from "validatex";
import {UI} from "./../base.js";

const DISABLE_SCROLL_CLASS = " dimmable dimmed scrolling";


export class ModalPool extends UI {
	static modals = []

	getStyle ({attrs, children, state}) {
		return {
			".ui.dimmer > .content > .center > *": {
				"color": "#000",
				"text-align": "left"
			},
		};
	}

	add (modal) {
		ModalPool.modals = ModalPool.modals.concat([modal]);
	}

	shift (modal) {
		ModalPool.modals = ModalPool.modals.slice(1);
	}

	onupdate (vnode) {
		let parentDom = vnode.dom.parentNode;
		const className = parentDom.className;

		if (ModalPool.modals.length > 0) {
			if (!className.match(DISABLE_SCROLL_CLASS)) {
				parentDom.className = className + DISABLE_SCROLL_CLASS;
			}
		}
		else {
			parentDom.className = className.replace(DISABLE_SCROLL_CLASS, "");
		}
	}

	removeModal (e) {
		if (e.target.className.match("modals")) {
			this.shift();
			return;
		}

		e.redraw = false;
	}

	getDefaultAttrs (vnode) {
		let attrs = super.getDefaultAttrs(vnode);
		attrs.onclick = this.removeModal.bind(this);
		return attrs;
	}

	getClassList (attrs) {
		return [
			"ui",
			attrs.inverted && "inverted",
			"page",
			"modals",
			"dimmer",
			ModalPool.modals.length !== 0 && "visible active"
		];
	}

	view ({attrs, children, state}) {
		return _("div", attrs.rootAttrs, ModalPool.modals);
	}
}
