import {UI} from "./../base.js";
import {numberMap} from "./../../helpers/enums.js";
import o from "mithril";


export class Fields extends UI {
	getClassList ({attrs}) {
		return [
			attrs.grouped && "grouped",
			numberMap[attrs.fieldCount],
			attrs.equalWidth && "equal width",
			attrs.inline && "inline",
			"fields"
		];
	}

	getDefaultAttrs(vnode) {
		let label = vnode.attrs.label;
		if (label) {
			vnode.children.unshift(o("label", label));
		}

		return super.getDefaultAttrs(vnode);
	}
}
