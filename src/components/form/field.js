import _ from "mithril";
import isObject from "lodash/isObject";
import isString from "lodash/isString";
import {input}  from "./input.js";
import {Base} from "./../base.js";
import {widthClassMap} from "./../../helpers/enums.js";
import {required} from "validatex";

export class Field extends Base {
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

	getClassList (attrs) {
		return [
			{inline: attrs.inline},
			"field",
			{disabled: attrs.disabled},
			{error: attrs.model.error() && ! attrs.hideError},
			widthClassMap[attrs.size]
		];
	}

  view (vnode)  {
		let attrs = vnode.attrs;

    let inputAttrs = {
      prepend: attrs.prepend,
      append: attrs.append,
      type: attrs.type,
      placeholder: attrs.placeholder,
      value: attrs.model(),
			class: attrs.input? attrs.input.class : "",
			disabled: attrs.disabled
    };

		if (attrs.readOnly) {
			inputAttrs.readonly = "";
		}
		else {
			if (!attrs.update && !attrs.validate) {
				throw Error("Either set fields as read only or set 'update' and 'validate' fields.");
			}

			if (attrs.update === attrs.validate) {
				inputAttrs[attrs.update] = m.withAttr('value', attrs.model.setAndValidate);
			}
			else {
				if (attrs.update) {
					inputAttrs[attrs.update] = m.withAttr('value', attrs.model);
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
             _(input, inputAttrs),
             this.getLabelAppend(attrs));
  }
}


export const field = new Field();
