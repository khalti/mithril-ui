import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";
import omit from "lodash/omit";
import keys from "lodash/keys";
import {sizeMap} from "./../helpers/enums.js";


export const form = component({
	base: base,
	attrSchema: {
		size: {inclusion: {within: keys(sizeMap),
											 message: "^Invalid size '%{value}'."}}
	},
	getDefaultAttrs (attrs) {
		return {root: "form"};
	},
	getClassList (attrs) {
		return ["ui",
						{"loading": attrs.loading},
						{"success": attrs.success},
						{"error": attrs.error},
						{"warning": attrs.warning},
						sizeMap[attrs.size],
						{inverted: attrs.inverted},
						{"equal width": attrs.equalWidth},
						"form"];
	}
});
