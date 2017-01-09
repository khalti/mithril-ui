import _ from "mithril";
import {required, within} from "validatex";
import {UI} from "./base.js";


export class Dimmer extends UI {
	attrSchema = {
		page: [required(false), within([true, false])],
		state: [required(false), within(["active", "disabled"])],
		inverted: [required(false), within([true, false])]
	}

	getClassList ({attrs}) {
		return [
			"ui",
			attrs.page && "page",
			attrs.state,
			attrs.inverted && "inverted",
			"dimmer"
		];
	}

	view ({attrs, children, state}) {
		return _("div", attrs.rootAttrs,
				_(".content",
					_(".center", children)));
	}
}

export const dimmer = new Dimmer();
