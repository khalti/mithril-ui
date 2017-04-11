import {UI} from "./base.js";

export class Label extends UI {
	getClassList ({attrs}) {
		return [
			"ui",
			"label"
		];
	}
}
