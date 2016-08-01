import {base} from "./base.js";
import component from "mithril-componentx";

export const content = component({
  base: base,
	getClassList: function (attrs) {
		return ["content"];
	}
});
