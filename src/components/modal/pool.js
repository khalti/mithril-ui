import _ from "mithril";
import {required, within} from "validatex";
import {Base} from "./../base.js";


export class ModalPool extends Base {
	modals = []

	getStyle ({attrs, children, state}) {
		return {
			".ui.dimmer > .content > .center > *": {
				"color": "#000",
				"text-align": "left"
			},
		};
	}

	add (modal) {
		modalPool.modals.unshift(modal);
	}

	shift (modal) {
		modalPool.modals.shift();
	}

	getClassList (attrs) {
		return [
			"ui",
			{"inverted": attrs.inverted},
			"page",
			"modals",
			"dimmer",
			modalPool.modals.length === 0? undefined: "visible active"
		];
	}

	view ({attrs, children, state}) {
		let modals = modalPool.modals.length;
		return m("div", attrs.rootAttrs, modals === 0? null: modalPool.modals);
	}
}


export const modalPool = new ModalPool();
