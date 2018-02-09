import _ from "mithril";
import {Field} from "./field.js";
import {required} from "validatex";
import {Dropdown} from "./../dropdown.js";


export class Select extends Field {
	attrSchema = {
		model: required(true),
		options: required(true),
		multiple: required(false)
	}

	menuVisible = false

	toggleMenu () {
		this.menuVisible = !this.menuVisible;
	}

	hideMenu () {
		this.menuVisible = false;
	}

	getSelectedIndex (options, value) {
		for (let i = 0; i < options.length; i ++ ) {
			if (options[i].value === value) {
				return i;
			}
		}
	}

  view (vdom) {
		let attrs = vdom.attrs;
		let selectRootAttr =
			// { value: attrs.model()
			// , onchange: _.withAttr("value", attrs.model.setAndValidate)
			// , selectedIndex: this.getSelectedIndex(attrs.options, attrs.model()) };
			{ model: attrs.model
			, placeholder: attrs.placeholder
			, name: attrs.name
			, search: attrs.search
			, fluid: attrs.fluid === false ? false : true
			, inline: attrs.inline
			, options: attrs.options
			, multiple: attrs.multiple
			};

		// if (attrs.name) {
		// 	selectRootAttr.name = attrs.name;
		// }

    return _("div", attrs.rootAttrs,
             this.getLabelPrepend(attrs),
             _(Dropdown, selectRootAttr),
             this.getLabelAppend(attrs));
  }
}
