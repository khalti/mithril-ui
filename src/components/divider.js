import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";
import {required, within} from "validatex";


export const divider = component({
	name: "divider",
  base: base,
	attrSchema: {
		type: [required(false),
					within(["vertical", "horizontal"], "Invalid type '{value}'.")],
	},
	getClassList: function (attrs) {
		return ["ui",
						attrs.type,
						{inverted: attrs.inverted},
						{fitted: attrs.fitted},
						{hidden: attrs.hidden},
						{section: attrs.section},
						{clearing: attrs.clearing},
						"divider"];
	}
});
