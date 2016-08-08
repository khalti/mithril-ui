import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";


export const form = component({
	base: base,
	getDefaultAttrs (attrs) {
		return {dom: {tagName: "form"}};
	},
	getClassList (attrs) {
		return ["ui",
						{"loading": attrs.loading},
						{"success": attrs.success},
						{"error": attrs.error},
						attrs.size? attrs.size: "",
						{inverted: attrs.inverted},
						{"equal width": attrs.equalWidth},
						{"warning": attrs.warning},
						"form"];
	}
});
