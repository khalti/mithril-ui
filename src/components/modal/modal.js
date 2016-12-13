import m from "mithril";
import component from "mithril-componentx";
import {required, within} from "validatex";
import {base} from "./../base.js";
import {modalPool} from "./pool.js";


export const modal = component({
	name: "modal",
	base: base,
	remove () {
		modalPool.shift();
	},
	onremove (vdom) {
		this.remove();
	},
	view ({attrs, children, state}) {
		return m(".content", attrs.rootAttrs,
				m(".center", children));
	}
});
