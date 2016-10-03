import {base} from "./../base.js";
import component from "mithril-componentx";


export const header = component({
	name: "menuHeader",
	base: base,
	getClassList (attrs) {
		return ["header"];
	}
});
