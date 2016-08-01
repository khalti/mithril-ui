import {base} from "./base.js";
import component from "mithril-componentx";


export const feilds = component({
	base: base,
	getClassList (attrs) {
		return ["fields"];
	}
});
