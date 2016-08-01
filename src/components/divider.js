import {base} from "./base.js";
import component from "mithril-componentx";

export const divider = component({
  base: base,
	getClassList: function (attrs) {
		return ["ui",
						"divider"];
	}
});
