import {Base} from "./base.js";
import _ from "mithril";
import {required, within} from "validatex";


export class Divider extends Base {
	attrSchema = {
		type: [required(false),
					within(["vertical", "horizontal"], "Invalid type '{value}'.")],
	}

	getClassList (attrs) {
		return ["ui",
						attrs.type,
						{inverted: attrs.inverted},
						{fitted: attrs.fitted},
						{hidden: attrs.hidden},
						{section: attrs.section},
						{clearing: attrs.clearing},
						"divider"];
	}
}


export const divider = new Divider();
