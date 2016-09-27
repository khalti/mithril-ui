import m from "mithril";
import component from "mithril-componentx";
import {required, within} from "validatex";


export const modalPool = component({
	name: "modalPool",
	modals: [],
	getStyle ({attrs, children, state}) {
		return {
			".ui.dimmer > .content > .center > *": {
				"color": "#000",
				"text-align": "left"
			},
		};
	},
	validateAttrs (attrs) {
		
	},
	add (modal) {
		this.modals.push(modal);
	},
	remove (modal) {
		let index = this.modals.indexOf(modal);
		this.modals.splice(index, 1);
	},
	getClassList (attrs) {
		return [
			"ui",
			{"inverted": attrs.inverted},
			"dimmer",
			"page",
			this.modals.length === 0? "hidden": "visible active"
		];
	},
	view ({attrs, children, state}) {
		if (this.modals.length === 0) {
			return m("div", attrs.rootAttrs);
		}
		else {
			return m("div", attrs.rootAttrs, this.modals);
		}
	}
});
