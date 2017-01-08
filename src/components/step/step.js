import {Base} from "./../base.js";
import _ from "mithril";
import {required} from "validatex";


export class StepTitle extends Base {
	getClassList ({attrs}) {
		return ["title"];
	}
}

export const stepTitle = new StepTitle();


export class StepContent extends Base {
	getClassList ({attrs}) {
		return ["content"];
	}
}

export const stepContent = new StepContent();


export class StepDescription extends Base {
	getClassList ({attrs}) {
		return ["description"];
	}
}

export const stepDescription = new StepDescription();


export class Step extends Base {
	attrSchema = {
		state: required(true),
		index: required(true)
	}

	getState (state, index) {
		if (index < state) return "completed";
		if (index === state) return "active";
		if (index > state) return "disabled";
	}

	getClassList({attrs}) {
		return [
			this.getState(attrs.state, attrs.index),
			"step"
		];
	}

	getDefaultAttrs({attrs}) {
		return {
			root: attrs.link? "a": "div"
		};
	}
}


export const step = new Step();
