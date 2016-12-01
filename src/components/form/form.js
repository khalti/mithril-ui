import {base} from "./../base.js";
import component from "mithril-componentx";
import m from "mithril";
import omit from "lodash/omit";
import keys from "lodash/keys";
import {sizeMap} from "./../../helpers/enums.js";
import {required, within} from "validatex";


export const form = component({
	name: "form",
	base: base,
	attrSchema: {
		size: [required(false), within(keys(sizeMap), "^Invalid size '%{value}'.")]
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
						attrs.action,
						attrs.method,
						"form"];
	}
});
