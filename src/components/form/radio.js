import o from "mithril";
import {required} from "validatex";
import {Field} from "./field.js";

export class Radio extends Field {
	attrSchema =
		{ model: required(true)
		, label: required(true)
		, value: required(true)
		}

	getStyle(vnode) {
		return {
			"div .ui.radio label": {
				cursor: "pointer"
			}
		};
	}

	setValue (attrs) {
		attrs.model.setAndValidate(attrs.value);
	}

	getLabelAppend (attrs) {
		if(attrs.help && !attrs.model.getError()) {
			return o('label.help', attrs.help);
		}
		else if(attrs.model.getError() && !attrs.hideError) {
			return o('label.error', attrs.model.getError());
		}
		return null;
	}

	shouldCheck(attrs) {
		return attrs.model.getData() === attrs.value;
	}

  view (vnode) {
		let attrs = vnode.attrs;
		attrs.rootAttrs.onclick = this.setValue.bind(this, attrs);

    return o('div', attrs.rootAttrs,
			o(".ui.radio.checkbox", {className: this.shouldCheck(attrs)? "checked": ""},
				o("input[type=radio][tabindex=0]",
					{ name: attrs.name
					, value: attrs.value
					, checked: this.shouldCheck(attrs)? true: false
					}),
				o("label", attrs.label)),
			this.getLabelAppend(attrs));
  }
}
