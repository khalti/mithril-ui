import {Base} from "./../base.js";
import m from "mithril";
import omit from "lodash/omit";
import keys from "lodash/keys";
import {sizeMap} from "./../../helpers/enums.js";
import {required, within} from "validatex";


export class Form extends Base {
	getDefaultAttrs (attrs) {
		return {root: "form"};
	}

	isRootAttr (value, key) {
		try {
			return /^(key|id|style|on.*|data-.*|config|method|action)$/.test(key)? true: false;
		}
		catch (err) {
			if (err instanceof TypeError) {
				return false;
			}
		}
	}

	getClassList (attrs) {
		return ["ui",
						attrs.loading && "loading",
						attrs.success && "success",
						attrs.error && "error",
						attrs.warning && "warning",
						sizeMap[attrs.size],
						attrs.inverted && "inverted",
						attrs.equalWidth && "equal width",
						"form"];
	}
}

Form.attrSchema = {
		size: [required(false), within(keys(sizeMap), "^Invalid size '%{value}'.")]
};

export const form = new Form();
