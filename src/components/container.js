import {Base} from "./base.js";
import {required, within} from "validatex";


export class Container extends Base {
	attrSchema = {
		type: [ required(false),
						within(["text", "fluid"], "Invalid value '{value}' for attribute 'type'.")],
		alignment: [required(false),
								within(["left", "center", "right", "justified"],
												"Invalid value '{value}' for attribute 'alignment'.")]
	}

	typeClassMap: {
		"text": "text",
		"fluid": "fluid"
	}

	alignmentClassMap: {
		"left": "",
		"center": "center aligned",
		"right": "right aligned",
		"justified": "justified"
	}

	getClassList (attrs) {
		return ["ui",
						this.typeClassMap[attrs.type],
						this.alignmentClassMap[attrs.alignment],
						"container"];
	}
}


export const container = new Container();
