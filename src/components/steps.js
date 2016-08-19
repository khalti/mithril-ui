import component from "mithril-componentx";
import {base} from "./base.js";
import {step} from "./step.js";
import enum from "./../helpers/enums.js";
import keys from "lodash/keys";
import map from "lodash/map";
import flattenDeep from "lodash/flattenDeep";
import m from "mithril";

export const steps = component({
	base: base,
	attrSchema: {
		attach: {
			inclusion: {
				within: keys(enum.attachmentMap),
				message: "Invalid value for attachment."
			}
		},
		steps: {presence: true},
		size: {
			inclusion: {
				within: keys(enum.sizeMap),
				message: "Invalid value for size."
			}
		}
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
			enum.attachmentMap[attrs.attach],
			enum.numberMap[attrs.steps.length],
			enum.sizeMap[attrs.size],
			"steps"
		];
	},
	view (vnode) {
		let attrs = vnode.attrs;

		let steps = map(attrs.steps, (stepAttrs, index) => {
			stepAttrs.state = attrs.state + 1;
			stepAttrs.index = index + 1;
			return m(step, stepAttrs);
		});

		return m("div", vnode.attrs.rootAttrs, steps)
	}
});
