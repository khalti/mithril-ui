import m from "mithril";
import {validate} from "validatex";
import omit from "lodash/omit.js";
import Component from "mithril-componentx";


export class Base extends Componen {
	getDefaultAttrs (attrs) {
		return {root: "div"};
	}

  validateAttrs (attrs) {
    let errors = validate(attrs, this.constructor.attrSchema);
		if (errors) {
			throw Error(JSON.stringify(errors));
		}
  }

  view ({attrs, children, state}) {
    return m(attrs.root, attrs.rootAttrs, children);
  }
}
