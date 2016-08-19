import {base} from "./base.js";
import component from "mithril-componentx";


export const title = component({
	base: base,
	getClassList (attrs) {
		return [
			"title"
		];
	}
});
