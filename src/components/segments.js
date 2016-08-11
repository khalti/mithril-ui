import {base} from "./base.js";
import component from "mithril-componentx";


export const segments = component({
	base: base,
	getClassList (attrs) {
		return ["ui",
						"segments"];
	}
});
