import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";
import omit from "lodash/omit";

export const item = component({
	base: base,
	getDefaultAttrs () {
		return {root: "a"};
	},
	getClassList (attrs) {
		return ["item"];
	}
});
