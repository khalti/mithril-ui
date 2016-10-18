import {base} from "./../base.js";
import component from "mithril-componentx";
import m from "mithril";
import keys from "lodash/keys";


export const tbody = component({
	base: base,
	attrSchema: {
	},
	getClassList (attrs) {
	},
	getDefaultAttrs (attrs) {
		return {root: "tbody"};
	}
});
