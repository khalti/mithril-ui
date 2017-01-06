import {Base} from "./../base.js";
import _ from "mithril";
import {sizeMap} from "./../../helpers/enums.js";
import {required, within} from "validatex";


export class Form extends Base {
	attrSchema = {
			size: [required(false), within(Object.keys(sizeMap), "^Invalid size '{value}'.")]
	}

	getDefaultAttrs ({attrs}) {
		return {root: "form"};
	}

	isRootAttr (key) {
		try {
			return /^(key|id|style|on.*|data-.*|config|method|action)$/.test(key)? true: false;
		}
		catch (err) {
			if (err instanceof TypeError) {
				return false;
			}
		}
	}

	getClassList ({attrs}) {
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


export const form = new Form();
