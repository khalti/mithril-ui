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
			"page",
			"dimmer",
			this.modals.length === 0? undefined: "active"
		];
	},
	view ({attrs, children, state}) {
		let modals = this.modals.length;
		return m("div", attrs.rootAttrs, modals === 0? null: this.modals);
	}
});
