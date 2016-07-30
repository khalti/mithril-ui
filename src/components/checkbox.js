import m from "mithril";
import {field} from "./field.js";
import component from "mithril-componentx";

export const checkbox = component({
	base: field,
	attrSchema: {
		model: {presence: true},
		label: {presence: true}
	},
	toggleState (attrs) {
		attrs.model.setAndValidate(!attrs.model());
	},
	getLabelAppend (attrs) {
		if(attrs.help && !attrs.model.errors()) {
			return m('label.help', attrs.help);
		}
		else if(attrs.model.error() && !attrs.hideError) {
			return m('label.error', attrs.model.error()[0]);
		}
		return null;
	},
  view (vnode) {
		let attrs = vnode.attrs;
		attrs.dom.onclick = this.toggleState.bind(this, attrs);

    return m('div', attrs.dom,
             m(".ui.checkbox", {className: attrs.model()? "checked": ""},
               m("input.hidden[type=checkbox][tabindex=0]", {checked: attrs.model()}),
               m("label", attrs.label)),
             this.getLabelAppend(attrs));
  }
});
