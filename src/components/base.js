import m from "mithril";
import validate from "validate.js";
import _ from "lodash";
import component from "mithril-componentx";

export const base = component({
  validateAttrs (attrs) {
    let errors = validate(attrs, this.attrSchema);
    if (errors) throw Error(JSON.stringify(errors));
  },
  view (vnode) {
    let attrs = vnode.attrs;

    return m(attrs.dom.tagName, _.omit(attrs.dom, ['tagName']), vnode.children);
  }
});
