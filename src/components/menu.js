import {base} from "./base.js";
import component from "mithril-componentx";

export const menu = component({
	base: base,
	getClassList (attrs) {
		return ["ui",
						"menu"];
	}
});
