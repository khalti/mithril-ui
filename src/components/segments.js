import {base} from "./base.js";
import component from "mithril-componentx";


export const segment = component({
	extend: base,
	getClassList (attrs) {
		return ["ui",
						"segments"];
	}
});
