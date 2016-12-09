import m from "mithril";
import  isObject from "lodash/isObject";
import isString from "lodash/isString";
import {input}  from "./input.js";
import component from "mithril-componentx";
import {base} from "./../base.js";
import {widthClassMap} from "./../../helpers/enums.js";
import {required} from "validatex";

export const field = component({
	name: "field",
	base: base,
	attrSchema: {
		model: required(true),
		type: required(true)
	},
	getLabelPrepend (attrs) {
		if(isString(attrs.label)) {
			return m('label', attrs.label);
		}
		else if (isObject(attrs.label) && attrs.label.prepend) {
			return m('label', attrs.label.text);
		}
		else if(isObject(attrs.label) && !attrs.label.prepend && !attrs.label.append) {
			return m('label', attrs.label.text);
		}
	},
	getLabelAppend (attrs) {
		if(isObject(attrs.label) && attrs.label.append) {
			return m('label', attrs.label.text);
		}
		else if(attrs.help && !attrs.model.error()) {
			return m('label.help', attrs.help);
		}
		else if(attrs.model.error() && !attrs.hideError) {
			return m('label.error', attrs.model.error());
		}
	},
	getClassList (attrs) {
		return [
			{inline: attrs.inline},
			"field",
			{disabled: attrs.disabled},
			{error: attrs.model.error() && ! attrs.hideError},
			widthClassMap[attrs.size]
		];
	},
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

    return m('div', attrs.rootAttrs,
             this.getLabelPrepend(attrs),
             m(input, inputAttrs),
             this.getLabelAppend(attrs));
  }
});
