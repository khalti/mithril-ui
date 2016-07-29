import m from "mithril";
import _ from "lodash";
import {input} from "./input.js";
import {field} from "./field.js";
import component from "mithril-componentx";

// m.component(PasswordField, {
//   'model':,
//   'label':,
//   'placeholder':,
//   'strengthChecker':,
//   'help':,
//   'update':,
//   'validate':,
// })
export const passwordField = component({
	base: field,
	attrSchema: {
		model: {presence: true},
		update: {presence: true},
		validate: {presence: true}
	},
	getDefaultAttrs () {
		return {type: "password"};
	},
	getStrengthMeter (attrs) {
		if (!attrs.strengthChecker || !attrs.model.isDirty()) return undefined;
		return m(".ui.bottom.attached.progress.success",
							m(".bar", {style: {"transition-duration": "300ms",
																width: attrs.strengthChecker(attrs.model())+"%"}
												}));
	},
  view (vnode) {
		let attrs = vnode.attrs;

		let vdom = this.base.view.originalView(attrs);
		vdom.children.splice(1, 0, this.getStrengthMeter(attrs));
  }
});
