import component from "mithril-componentx";
import m from "mithril";
import {required, within} from "validatex";
import {base} from "./base.js";


export const dimmer = component({
	name: "dimmer",
	base: base,
	attrSchema: {
		page: [required(false), within([true, false])],
		state: [required(false), within(["active", "disabled"])],
		inverted: [required(false), within([true, false])]
	},
	getClassList (attrs) {
		return [
			"ui",
			{page: attrs.page},
			{active: attrs.state === "active"},
			{disabled: attrs.state === "disabled"},
			{inverted: attrs.inverted},
			"dimmer"
		];
	},
	view ({attrs, children, state}) {
		return m("div", attrs.rootAttrs,
				m(".content",
					m(".center", children)));
	}
});
