import {base} from "./base.js";
import component from "mithril-componentx";


export const description = component({
	base: base,
	getClassList (attrs) {
		return ["description"];
	}
});
