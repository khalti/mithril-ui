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
						"form"];
	}
});
