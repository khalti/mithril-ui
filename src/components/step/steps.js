import {UI} from "./../base.js";
import {step} from "./step.js";
import enums from "./../../helpers/enums.js";
import map from "lodash/map";
import flattenDeep from "lodash/flattenDeep";
import _ from "mithril";
import {required, within} from "validatex";
import {isArray} from "./../../helpers/type.js";


export class Steps extends UI {
	attrSchema = {
		attach: [ required(false),
							within(Object.keys(enums.attachmentMap), "Invalid value for attachment.")],
		size: [required(false), within(Object.keys(enums.sizeMap), "Invalid value for size.")]
	}

	getDefaultAttrs ({attrs}) {
		return {currentStep: attrs.currentStep || 0};
	}

	getClassList ({attrs, children}) {
		let stepsCount = 0;
		if (children && !isArray(children)) {
			children = [children];
			stepsCount = children.length;
		}
		else {
			stepsCount = children.length;
		}

		return [
			"ui",
			attrs.ordered && "ordered",
			attrs.vertical && "vertical",
			attrs.fluid && "fluid",
			enums.attachmentMap[attrs.attach],
			enums.numberMap[stepsCount],
			enums.sizeMap[attrs.size],
			"steps"
		];
	}

	view ({attrs, children, state}) {
		if (children && !isArray(children)) {
			children = [children];
		}

		let childIndex = 0;
		children = children.map((child) => {
			if (childIndex === attrs.currentStep) {
				child.attrs.state = "active";
			}
			else if (childIndex > attrs.currentStep) {
				child.attrs.state = "disabled";
			}
			else if (childIndex < attrs.currentStep) {
				child.attrs.state = "completed";
			}

			childIndex ++;

			return child;
		});

		return _("div", attrs.rootAttrs, children);
	}
}


export const steps = new Steps();
