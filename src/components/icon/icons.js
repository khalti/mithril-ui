import {Icon} from "./icon.js";
import _ from "mithril";
import {sizeMap} from "./../../helpers/enums.js";
import {required, within} from "validatex";


export class Icons extends Icon {
	attrSchema = {
		size: [required(false), within(Object.keys(sizeMap))]
	}

	getClassList ({attrs}) {
		return [
			attrs.size,
			"icons",
		];
	}
}


export const icons = new Icons();
