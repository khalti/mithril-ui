import {base} from "./../base.js";
import component from "mithril-componentx";

export const subMenu = component({
	base: base,
	getClassList (attrs) {
		return ["menu"];
	}
});
