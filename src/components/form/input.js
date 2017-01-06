import _ from 'mithril';
import {Base} from "./../base.js";
import omit from "lodash/omit";
import omitBy from "lodash/omitBy";
import {required} from "validatex";
import {componentIs, is} from "./../../helpers/misc.js";
import {Icon} from "./../icon/icon.js";
import {Button} from "./../button/button.js";
import {Label} from "./../label.js";


let isEventHandler = (value, key) => {
	return /^on.*$/.test(key);
};

export class Input extends Base {
	attrSchema = {
		type: required(true),
		prepend: [required(false), componentIs([Icon, Button, Label])],
		append: [required(false), componentIs([Icon, Button, Label])]
	}

	getClassList ({attrs}) {
		let {prepend, append} = attrs;
		return ["ui",
			prepend && is(prepend, Icon) && (!append || !is(append, Icon)) && "left icon",
			(!prepend || !is(prepend, Icon)) && append && is(append, Icon) && "right icon",
			prepend && is(prepend, Icon) && append && is(append, Icon) && "left right icon",
			prepend && is(prepend, Label) && (!append || !is(append, Label)) && "left labeled",
			(!prepend || !is(prepend, Label)) && append && is(append, Label) && "right labeled",
			prepend && is(prepend, Label) && append && is(append, Label) && "left right labeled",
			prepend && is(prepend, Button) && (!append || !is(append, Button)) && "left action",
			(!prepend || !is(prepend, Button)) && append && is(append, Button) && "right action",
			prepend && is(prepend, Button) && append && is(append, Button) && "left right action",
			attrs.disabled && "disabled",
			attrs.fluid && "fluid",
			"input"];
	}

  view ({attrs, children, state}) {
		let inputAttrs = omit(attrs, ['prepend', 'append', 'rootAttrs']);
		inputAttrs.className = attrs.type === "hidden"? "hidden": "";

		if (attrs.name) {
			inputAttrs.name = attrs.name;
		}

		if (attrs.disabled) {
			inputAttrs.tabIndex = -1
		}

		delete inputAttrs.root;

		console.log(attrs.prepend);
    return _('div', omitBy(attrs.rootAttrs, isEventHandler),
						 attrs.prepend? _(attrs.prepend): undefined,
						 _('input', inputAttrs),
						 attrs.append? _(attrs.append): undefined);
  }
}

export const input = new Input();
