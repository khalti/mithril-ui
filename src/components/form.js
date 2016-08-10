import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";
import omit from "lodash/omit";


export const form = component({
	base: base,
	getDefaultAttrs (attrs) {
		let defaultAttrs = {dom: {}};

		if (attrs.onsubmit) {
			defaultAttrs.dom.onsubmit = attrs.onsubmit;
		}

		return defaultAttrs;
	},
	getClassList (attrs) {
		return ["ui",
						{"loading": attrs.loading},
						{"success": attrs.success},
						{"error": attrs.error},
						attrs.size,
						{inverted: attrs.inverted},
						{"equal width": attrs.equalWidth},
						{"warning": attrs.warning},
						"form"];
	},
	view (vnode) {
		let attrs = vnode.attrs;

		return m("form", attrs.dom, vnode.children);
	}
});
