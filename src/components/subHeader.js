import {base} from "./base.js";
import component from "mithril-componentx";

export const subHeader = component({
	base: base,
	getClassList (attrs) {
			return ["sub header"];
		}
});
