import {base} from "./../base.js";
import component from "mithril-componentx";
import m from "mithril";
import keys from "lodash/keys";


export const tfoot = component({
	name: "tfoot",
	base: base,
	attrSchema: {
	},
	getClassList (attrs) {
		return [
			{"full-width": attrs.fullWidth}
		];
	},
	getDefaultAttrs (attrs) {
		return {root: "tfoot"};
	}
});
