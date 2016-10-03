import {base} from "./base.js";
import component from "mithril-componentx";


export const title = component({
	name: "title",
	base: base,
	getClassList (attrs) {
		return [
			"title"
		];
	}
});
