import _ from "mithril";
import {Field} from "./field.js";
import {required} from "validatex";


export class Checkbox extends Field {
	attrSchema = {
		model: required(true),
		label: required(true)
	}

	toggleState (attrs) {
		attrs.model.setAndValidate(!attrs.model());
	}

	getLabelAppend (attrs) {
		if(attrs.help && !attrs.model.errors()) {
			return _('label.help', attrs.help);
		}
		else if(attrs.model.error() && !attrs.hideError) {
			return _('label.error', attrs.model.error());
		}
		return null;
	}

  view (vnode) {
		let attrs = vnode.attrs;
		attrs.rootAttrs.onclick = this.toggleState.bind(this, attrs);

    return _('div', attrs.rootAttrs,
             _(".ui.checkbox", {className: attrs.model()? "checked": ""},
               _("input.hidden[type=checkbox][tabindex=0]", {checked: attrs.model()}),
               _("label", attrs.label)),
             this.getLabelAppend(attrs));
  }
}


export const checkbox = new Checkbox();
