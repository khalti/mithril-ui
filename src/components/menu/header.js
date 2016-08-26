import {base} from "./../base.js";
import component from "mithril-componentx";


export const header = component({
	base: base,
	getClassList (attrs) {
		return ["header"];
	}
});
