import {Base} from "./base.js";

export class SubHeader extends Base {
	getClassList ({attrs}) {
			return ["sub header"];
		}
}


export const subHeader = new SubHeader();
