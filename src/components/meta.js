import {base} from "./base.js";
import component from "mithril-componentx";

export const meta = component({
	base: base,
	getClassList (attrs) {
		return ["meta"];
	}
});
