import {base} from "./base.js";
import component from "mithril-componentx";


export const description = component({
	name: "description",
	base: base,
	getClassList (attrs) {
		return ["description"];
	}
});
