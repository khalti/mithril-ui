import {UI} from "./base.js";

export class Label extends UI {
	getClassList ({attrs}) {
		return [
			"ui",
			"label"
		];
	}
}


export const label = new Label();
