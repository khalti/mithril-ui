import {base} from "./base.js";
import component from "mithril-componentx";

export const card = component({
	base: base,
	getClassList (attrs) {
		return ["ui", "card"];
	}
});
