import {base} from "./base.js";
import component from "mithril-componentx";
import m from "mithril";
import omit from "lodash/omit";


export const image = component({
  base: base,
	getDefaultAttrs () {
		return {dom: {tagName: "img"}};
	},
	getClassList (attrs) {
		return ["ui",
						"image"];
	},
  view (c, attrs) {
    return m(attrs.dom.tagName, omit(attrs.dom, ["tagName"]), attrs.children);
  }
});
