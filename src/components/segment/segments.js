import {Base} from "./../base.js";
import {required, within} from "validatex";


export class Segments extends Base {
	attrSchema = {
		horizontal: [required(false), within(true, false)],
		raised: [required(false), within(true, false)],
		stacked: [required(false), within(true, false)],
		piled: [required(false), within(true, false)],
		compact: [required(false), within(true, false)],
	}

	getClassList ({attrs}) {
		return ["ui",
						attrs.horizontal && "horizontal",
						attrs.raised && "raised",
						attrs.stacked && "stacked",
						attrs.piled && "piled",
						attrs.compact && "compact",
						"segments"];
	}
}


export const segments = new Segments();
