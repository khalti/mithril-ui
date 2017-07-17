import {base} from "./base.js";
import component from "mithril-componentx";

export const subHeader = component({
	name: "subHeader",
	base: base,
	getClassList (attrs) {
			return ["sub header"];
		}
});
