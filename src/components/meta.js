import {base} from "./base.js";
import component from "mithril-componentx";

export const meta = component({
	name: "meta",
	base: base,
	getClassList (attrs) {
		return ["meta"];
	}
});
