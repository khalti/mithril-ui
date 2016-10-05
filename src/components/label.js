import {base} from "./base.js";
import component from "mithril-componentx";

export const label = component({
	name: "label",
	base: base,
	getClassList (attrs) {
		return [
			"ui",
			"label"
		];
	}
});
