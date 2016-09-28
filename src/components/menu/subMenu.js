import {base} from "./../base.js";
import component from "mithril-componentx";
import {required, within} from "validatex";

export const subMenu = component({
	base: base,
	attrSchema: {
		right: [required(false), within([true, false])]
	},
	getClassList (attrs) {
		return [
			{right: attrs.right},
			"menu"
		];
	}
});
