import {UI} from "./base.js";
import {required, within} from "validatex";
import {textAlignmentMap} from "./../helpers/enums.js";


const typeClassMap = {
	"text": "text",
	"fluid": "fluid"
}

export class Container extends UI {
	attrSchema = {
		type: [ required(false),
						within(["text", "fluid"], "Invalid value '{value}' for attribute 'type'.")],
		textAlignment: [required(false),
								within(["left", "center", "right", "justified"],
												"Invalid value '{value}' for attribute 'alignment'.")]
	}

	getClassList ({attrs}) {
		return ["ui",
						typeClassMap[attrs.type],
						textAlignmentMap[attrs.textAlignment],
						"container"];
	}
}
