import m from "mithril";
import validate from "validate.js";
import omit from "lodash/omit.js";
import component from "mithril-componentx";

export const base = component({
	getDefaultAttrs (attrs) {
		return {dom: {tagName: "div"}};
	},
  validateAttrs (attrs) {
    let errors = validate(attrs, this.attrSchema);
    if (errors) throw Error(JSON.stringify(errors));
  },
  view (vnode) {
    let attrs = vnode.attrs;
    return m(attrs.dom.tagName, _.omit(attrs.dom, ['tagName']), vnode.children);
  }
});
