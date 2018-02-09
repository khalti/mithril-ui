import {UI} from "./base.js";
import _ from "mithril";
import {required, within} from "validatex";


export class Divider extends UI {
	attrSchema = {
		type: [required(false),
					within(["vertical", "horizontal"], "Invalid type '{value}'.")],
	}

	getClassList ({attrs}) {
		return ["ui",
						attrs.type,
						attrs.inverted && "inverted",
						attrs.fitted && "fitted",
						attrs.hidden && "hidden",
						attrs.section && "section",
						attrs.clearing && "clearing",
						"divider"];
	}
}
