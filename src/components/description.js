import {base} from "./base.js";
import component from "mithril-componentx";


export const descriptoin = component({
	extend: base,
	getClassList (attrs) {
		return ["description"];
	}
});
