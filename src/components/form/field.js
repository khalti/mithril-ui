import _ from "mithril";
import {isObject, isString} from "./../../helpers/type.js";
import {Input}  from "./input.js";
import {UI} from "./../base.js";
import {widthMap} from "./../../helpers/enums.js";
import {required} from "validatex";
import Component from "mithril-componentx";


export class Field extends UI {
	attrSchema = {
		model: required(true),
		type: required(true)
	}

	getStyle () {
		return {
			"div.field > label.help": {
				"font-weight": 100,
				"color": "rgba(0, 0, 0, 0.5)",
			},
			"div.field > label.error": {
				"font-weight": 100
			}
		};
	}

	getLabelPrepend (attrs) {
		if(isString(attrs.label)) {
			return _('label', attrs.label);
		}
		else if (isObject(attrs.label) && attrs.label.prepend) {
			return _('label', attrs.label.text);
		}
		else if(isObject(attrs.label) && !attrs.label.prepend && !attrs.label.append) {
			return _('label', attrs.label.text);
		}
	}

	getLabelAppend (attrs) {
		if(isObject(attrs.label) && attrs.label.append) {
			return _('label', attrs.label.text);
		}
		else if(attrs.help && !attrs.model.error() && !attrs.model()) {
			return _('label.help', attrs.help);
		}
		else if(attrs.model.error() && !attrs.hideError) {
			return _('label.error', attrs.model.error());
		}
	}

	getClassList ({attrs}) {
		return [
			attrs.inline && "inline",
			"field",
			attrs.disabled && "disabled",
			attrs.model.error() && !attrs.hideError && "error",
			widthMap[attrs.size]
		];
	}

  view ({attrs, children, state})  {
    let inputAttrs = {
      prepend: attrs.prepend,
      append: attrs.append,
      type: attrs.type,
      placeholder: attrs.placeholder,
      value: attrs.model(),
			class: attrs.input? attrs.input.class : "",
			disabled: attrs.disabled,
			loading: attrs.loading,
			step: attrs.step
    };

		if (attrs.readOnly) {
			inputAttrs.readonly = "";
		}
		else {
			if (!attrs.update && !attrs.validate) {
				throw Error("Either set fields as read only or set 'update' and 'validate' fields.");
			}

			if (attrs.update === attrs.validate) {
				inputAttrs[attrs.update] = _.withAttr('value', attrs.model.setAndValidate);
			}
			else {
				if (attrs.update) {
					inputAttrs[attrs.update] = _.withAttr('value', attrs.model);
				}
				if (attrs.validate) {
					inputAttrs[attrs.validate] = () => {attrs.model.isValid();};
				}
			}
		}

		if (attrs.name) {
			inputAttrs.name = attrs.name;
		}

    return _('div', attrs.rootAttrs,
             this.getLabelPrepend(attrs),
             _(Input, inputAttrs),
             this.getLabelAppend(attrs));
  }
}
