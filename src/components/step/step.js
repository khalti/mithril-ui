import {Base} from "./../base.js";
import {content} from "./../content.js";
import {title} from "./../title.js";
import {description} from "./../description.js";
import _ from "mithril";
import {required} from "validatex";


export class Step extends Base {
	attrSchema = {
		title: required(true),
		state: required(true),
		index: required(true)
	}

	getState (state, index) {
		if (index < state) return "completed";
		if (index === state) return "active";
		if (index > state) return "disabled";
	}

	getClassList(attrs) {
		return [
			this.getState(attrs.state, attrs.index),
			"step"
		];
	}

	getDefaultAttrs({attrs}) {
		return {
			root: attrs.link? "a": "div"
		};
	}

	view (vnode) {
		let attrs = vnode.attrs;

		if (attrs.icon) {
			return _(attrs.root, attrs.rootAttrs,
					_(attrs.icon),
					_(content,
						_(title, attrs.title),
						_(description, attrs.description)));
		}

		return _(attrs.root, attrs.rootAttrs,
			_(title, attrs.title),
			_(description, attrs.description));
	}
}


export const step = new Step();
