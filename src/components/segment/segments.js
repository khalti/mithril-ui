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

	getClassList (attrs) {
		return ["ui",
						{horizontal: attrs.horizontal},
						{raised: attrs.raised},
						{stacked: attrs.stacked},
						{piled: attrs.piled},
						{compact: attrs.compact},
						"segments"];
	}
}


export const segments = new Segments();
