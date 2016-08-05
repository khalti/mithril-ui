import {base} from "./base.js";
import component from "mithril-componentx";

export const button = component({
  base: base,
	getDefaultAttrs (attrs) {
		return {dom: {tagName: "form"}};
	},
	getClassList (attrs) {
		return ["ui",
						"button"];
	}
});
