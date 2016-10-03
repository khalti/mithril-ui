import m from "mithril";
import component from "mithril-componentx";
import {required, within} from "validatex";
import {base} from "./../base.js";


export const modal = component({
	name: "modal",
	base: base,
	view ({attrs, children, state}) {
		return m(".content", attrs.rootAttrs,
				m(".center", children));
	}
});
