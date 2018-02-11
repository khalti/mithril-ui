import {Field} from "./field.js";
import o from "mithril";
import {required} from "validatex";

export class TextArea extends Field {
	attrSchema = {
		model: required(true)
	}

	view ({attrs, children, state}) {
		let textareaAttrs = {
			rows: attrs.rowCount,
			name: attrs.name,
			placeholder: attrs.placeholder,
			value: attrs.model.getData()
			// autoExpand
		};

		if (attrs.readOnly) {
			textareaAttrs.readonly = "";
		}
		else {
			if (!attrs.update && !attrs.validate) {
				throw Error("Either set fields as read only or set 'update' and 'validate' fields.");
			}

			if (attrs.update === attrs.validate) {
				textareaAttrs[attrs.update] = o.withAttr('value', attrs.model.setAndValidate, attrs.model);
			}
			else {
				if (attrs.update) {
					textareaAttrs[attrs.update] = o.withAttr('value', attrs.model.setData, attrs.model);
				}
				if (attrs.validate) {
					textareaAttrs[attrs.validate] = () => {attrs.model.isValid();};
				}
			}
		}

		// if (attrs.name) {
		// 	textareaAttrs.name = attrs.name;
		// }

		return o("div", attrs.rootAttrs,
				this.getLabelPrepend(attrs),
				o("textarea", textareaAttrs),
				this.getLabelAppend(attrs));
	}
}
