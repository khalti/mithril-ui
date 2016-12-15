import m from "mithril";
import map from "lodash/map";
import {field} from "./field.js";
import component from "mithril-componentx";
import {required} from "validatex";


export const select = component({
	name: "select",
	base: field,
	attrSchema: {
		model: required(true),
		options: required(true),
		multiple: required(false)
	},
	menuVisible: false,
	toggleMenu () {
		this.menuVisible = !this.menuVisible;
	},
	hideMenu () {
		this.menuVisible = false;
	},
  view (vdom) {
		let attrs = vdom.attrs;
		let selectRootAttr = {value: attrs.model(),
													onchange: m.withAttr("value", attrs.model.setAndValidate)};
		if (attrs.name) {
			selectRootAttr.name = attrs.name;
		}

    return m("div", attrs.rootAttrs,
             this.getLabelPrepend(attrs),
             m("select", selectRootAttr,
               map(attrs.options, (option) => {
								 let optionAttrs = {value: option.value};
								 if (option.value === attrs.model()) {
									 optionAttrs.selected = "selected";
								 }
                 return m("option", optionAttrs, option.label);
               })),
             this.getLabelAppend(attrs));
  }
});
