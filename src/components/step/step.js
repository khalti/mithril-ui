import {UI} from "./../base.js";
import _ from "mithril";
import {required, within} from "validatex";


export class StepTitle extends UI {
	getClassList ({attrs}) {
		return ["title"];
	}
}


export class StepContent extends UI {
	getClassList ({attrs}) {
		return ["content"];
	}
}


export class StepDescription extends UI {
	getClassList ({attrs}) {
		return ["description"];
	}
}


const STEP_STATES = ["completed", "active", "disabled"];

export class Step extends UI {
	attrSchema = {
		state: [required(true), within(STEP_STATES)]
	}

	getClassList({attrs}) {
		return [
			attrs.state,
			"step"
		];
	}

	getDefaultAttrs({attrs}) {
		return {
			root: attrs.link? "a": "div"
		};
	}
}
