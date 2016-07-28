import {base} from "./base.js";
import component from "mithril-componentx";

export const container = component({
  base: base,
	attrSchema: {
		type: {presence: false,
						inclusion: {within: ["text", "fluid"],
												message: "^Invalid value '%{value}' for attribute 'type'."}},
		alignment: {presence: false,
								inclusion: {within: ["left", "center", "right", "justified"],
														message: "^Invalid value '%{value}' for attribute 'alignment'."}}
	},
	typeClassMap: {
		"text": "text",
		"fluid": "fluid"
	},
	alignmentClassMap: {
		"left": "",
		"center": "center aligned",
		"right": "right aligned",
		"justified": "justified"
	},
	getClassList (attrs) {
		return ["ui",
						this.typeClassMap[attrs.type],
						this.alignmentClassMap[attrs.alignment],
						"container"];
	}
});
