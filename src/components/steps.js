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
		return {state: attrs.state || m.prop(0)};
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

		let titles = map(attrs.steps, (astep, index) => {
			let aTitle = astep[0];
			aTitle.state = attrs.state();
			aTitle.index = index + 1;
			return m(step, aTitle);
		});
		let contents = map(attrs.steps, (astep, index) => {
			let aContent = astep[1];
			return m(aContent, {state: attrs.state, index: index + 1});
		});

		return m("div", vnode.attrs.rootAttrs, flattenDeep([titles, contents]))
	}
});
