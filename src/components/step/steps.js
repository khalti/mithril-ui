import component from "mithril-componentx";
import {base} from "./../base.js";
import {step} from "./step.js";
import enums from "./../../helpers/enums.js";
import keys from "lodash/keys";
import map from "lodash/map";
import flattenDeep from "lodash/flattenDeep";
import m from "mithril";
import {required, within} from "validatex";

export const steps = component({
	name: "steps",
	base: base,
	attrSchema: {
		attach: [required(false), within(keys(enums.attachmentMap),
																		"Invalid value for attachment.")],
		steps: required(true),
		size: [required(false), within(keys(enums.sizeMap), "Invalid value for size.")]
	},
	getDefaultAttrs (attrs) {
		return {state: attrs.state || 0};
	},
	getClassList (attrs) {
		return [
			"ui",
			{ordered: attrs.ordered},
			{vertical: attrs.vertical},
			{fluid: attrs.fluid},
			enums.attachmentMap[attrs.attach],
			enums.numberMap[attrs.steps.length],
			enums.sizeMap[attrs.size],
			"steps"
		];
	},
	view (vnode) {
		let attrs = vnode.attrs;

		let steps = map(attrs.steps, (stepAttrs, index) => {
			stepAttrs.state = attrs.state;
			stepAttrs.index = index + 1;
			return m(step, stepAttrs);
		});

		return m("div", vnode.attrs.rootAttrs, steps)
	}
});
