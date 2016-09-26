import component from "mithril-componentx";
import {base} from "./base.js";
import {within, required} from "validatex";
import m from "mithril";


export const pusher = component({
	base: base,
	attrSchema: {
		dimmed: [required(false), within([true, false])]
	},
	getClassList (attrs) {
		return [
			{dimmed: attrs.dimmed},
			"pusher"
		];
	},
	view ({attrs, children, state}) {
		return m("div", attrs.rootAttrs, children);
	}
});
