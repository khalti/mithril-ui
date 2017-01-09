import {UI} from "./base.js";
import {within, required} from "validatex";
import _ from "mithril";


export class Pusher extends UI {
	attrSchema = {
		dimmed: [required(false), within([true, false])]
	}

	getClassList ({attrs}) {
		return [
			attrs.dimmed && "dimmed",
			"pusher"
		];
	}

	view ({attrs, children, state}) {
		return _("div", attrs.rootAttrs, children);
	}
}


export const pusher = new Pusher();
