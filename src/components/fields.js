import {base} from "./base.js";
import component from "mithril-componentx";


export const feilds = component({
	extend: base,
	getClassList (attrs) {
		return ["fields"];
	}
});
