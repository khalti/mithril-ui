import _ from "mithril";
import {Field} from "./field.js";
import {required, within} from "validatex";

const TYPES = ["slider", "toggle"];

export class Checkbox extends Field {
	attrSchema = {
		model: required(true),
		label: required(true),
		type: [required(false), within(TYPES)]
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

  view ({attrs, children, state}) {
		attrs.rootAttrs.onclick = this.toggleState.bind(this, attrs);

		let checkboxClasses = [];
		attrs.model() && checkboxClasses.push("checked");
		attrs.type && checkboxClasses.push(attrs.type);

    return _('div', attrs.rootAttrs,
             _(".ui.checkbox", {className: checkboxClasses.join(" ")},
               _("input.hidden[type=checkbox][tabindex=0]", {checked: attrs.model()}),
               _("label", attrs.label)),
             this.getLabelAppend(attrs));
  }
}
