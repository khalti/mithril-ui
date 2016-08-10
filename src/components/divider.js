import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";


export const divider = component({
  base: base,
	attrSchema: {type: {inclusion: {within: ["vertical", "horizontal"],
																	message: "^Invalid type '%{value}'."}}},
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
