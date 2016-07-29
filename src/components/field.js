import m from "mithril";
import  isObject from "lodash/isObject";
import isString from "lodash/isString";
import {input}  from "./input.js";
import component from "mithril-componentx";
import {base} from "./base.js";

export const field = component({
	base: base,
	attrSchema: {
		model: {presence: true},
		type: {presence: true}
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
			{inline: attrs.isInline},
			"field",
			{error: attrs.model.error() && ! attrs.hideError}
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
			dom: {
				className: attrs.input? attrs.input.class : ""
			}
    };


    if (attrs.update === attrs.validate) {
      inputAttrs[attrs.update] = m.withAttr('value', attrs.model.setAndValidate);
    }
    else {
      inputAttrs[attrs.update] = m.withAttr('value', attrs.model);
      inputAttrs[attrs.validate] = () => {attrs.model.isValid();};
    }

    return m('div', attrs.dom,
             this.getLabelPrepend(attrs),
             m(input, inputAttrs),
             this.getLabelAppend(attrs));
  }
});
