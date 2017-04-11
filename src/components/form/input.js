import _ from 'mithril';
import {UI} from "./../base.js";
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

export class Input extends UI {
	attrSchema = {
		type: required(true),
		prepend: [required(false), componentIs([Icon, Button, Label])],
		append: [required(false), componentIs([Icon, Button, Label])]
	}

	getClassList ({attrs}) {
		let {prepend, append} = attrs;
		return ["ui",
			prepend && is(prepend.tag, Icon) && (!append || !is(append.tag, Icon)) && "left icon",
			(!prepend || !is(prepend.tag, Icon)) && append && is(append.tag, Icon) && "right icon",
			prepend && is(prepend.tag, Icon) && append && is(append.tag, Icon) && "left right icon",
			prepend && is(prepend.tag, Label) && (!append || !is(append.tag, Label)) && "left labeled",
			(!prepend || !is(prepend.tag, Label)) && append && is(append.tag, Label) && "right labeled",
			prepend && is(prepend.tag, Label) && append && is(append.tag, Label) && "left right labeled",
			prepend && is(prepend.tag, Button) && (!append || !is(append.tag, Button)) && "left action",
			(!prepend || !is(prepend.tag, Button)) && append && is(append.tag, Button) && "right action",
			prepend && is(prepend.tag, Button) && append && is(append.tag, Button) && "left right action",
			attrs.disabled && "disabled",
			attrs.loading && "loading",
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

    return _('div', omitBy(attrs.rootAttrs, isEventHandler),
						 attrs.prepend? attrs.prepend: undefined,
						 _('input', inputAttrs),
						 attrs.append? attrs.append: undefined);
  }
}
