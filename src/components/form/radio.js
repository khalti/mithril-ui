import o from "mithril";
import {required} from "validatex";
import {Field, field} from "./../ui";


class Radio extends Field {
	attrSchema =
		{ model: required(true)
		, label: required(true) }

	setValue (attrs) {
		attrs.model.setAndValidate(attrs.value);
	}

	getLabelAppend (attrs) {
		if(attrs.help && !attrs.model.errors()) {
			return o('label.help', attrs.help);
		}
		else if(attrs.model.error() && !attrs.hideError) {
			return o('label.error', attrs.model.error());
		}
		return null;
	}

  view (vnode) {
		let attrs = vnode.attrs;
		attrs.rootAttrs.onclick = this.setValue.bind(this, attrs);

    return o('div', attrs.rootAttrs,
             o(".ui.radio.checkbox", {className: attrs.model()===attrs.value? "checked": ""},
               o("input[type=radio][tabindex=0]", {name: attrs.name, value: attrs.model()}),
               o("label", attrs.label)),
             this.getLabelAppend(attrs));
  }
}
