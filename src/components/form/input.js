import _ from 'mithril';
import {Base} from "./../base.js";
import omit from "lodash/omit";
import omitBy from "lodash/omitBy";
import {required} from "validatex";


let isEventHandler = (value, key) => {
	return /^on.*$/.test(key);
};

let isComponent = (comp) => {
	if (!comp.is) {
		return "Please pass a 'mithril-componentx' component which has not been passed through m."
	}
}

export class Input extends Base {
	attrSchema = {
		type: required(true),
		prepend: [required(false), isComponent],
		append: [required(false), isComponent]
	}

	getClassList (attrs) {
		let {prepend, append} = attrs;
		return ["ui",
			{"left icon": prepend && prepend.is("icon") && (!append || !append.is("icon"))},
			{"right icon": (!prepend || !prepend.is("icon")) && append && append.is("icon")},
			{"left right icon": prepend && prepend.is("icon") && append && append.is("icon")},
			{"left labeled": prepend && prepend.is("label") && (!append || !append.is("label"))},
			{"right labeled": (!prepend || !prepend.is("label")) && append && append.is("label")},
			{"left right labeled": prepend && prepend.is("label") && append && append.is("label")},
			{"left action": prepend && prepend.is("button") && (!append || !append.is("button"))},
			{"right action": (!prepend || !prepend.is("button")) && append && append.is("button")},
			{"left right action": prepend && prepend.is("button") && append && append.is("button")},
			{disabled: attrs.disabled},
			{fluid: attrs.fluid},
			"input"];
	}

  view (vnode) {
		let attrs = vnode.attrs;
		let inputAttrs = omit(attrs, ['prepend', 'append', 'rootAttrs']);
		inputAttrs.className = attrs.type === "hidden"? "hidden": "";

		if (attrs.name) {
			inputAttrs.name = attrs.name;
		}

		if (attrs.disabled) {
			inputAttrs.tabIndex = -1
		}

		delete inputAttrs.root;

    return _('div', omitBy(attrs.rootAttrs, isEventHandler),
						 attrs.prepend? m(attrs.prepend): undefined,
						 _('input', inputAttrs),
						 attrs.append? m(attrs.append): undefined);
  }
}

export const input = new Input();
