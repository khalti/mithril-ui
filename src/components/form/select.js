import _ from "mithril";
import map from "lodash/map";
import {Field} from "./field.js";
import {required} from "validatex";


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
			{ value: attrs.model()
			, onchange: _.withAttr("value", attrs.model.setAndValidate)
			, selectedIndex: this.getSelectedIndex(attrs.options, attrs.model()) };

		if (attrs.name) {
			selectRootAttr.name = attrs.name;
		}

    return _("div", attrs.rootAttrs,
             this.getLabelPrepend(attrs),
             _("select", selectRootAttr,
               map(attrs.options, (option) => {
								 let optionAttrs = {value: option.value};
								 if (option.value === attrs.model()) {
									 optionAttrs.selected = true;
								 }

                 return _("option", optionAttrs, option.label);
               })),
             this.getLabelAppend(attrs));
  }
}


export const select = new Select();
