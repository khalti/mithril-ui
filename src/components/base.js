import o from "mithril";
import {validate} from "validatex";
import omit from "lodash/omit.js";
import Component from "mithril-componentx";


export class UI extends Component {
	getDefaultAttrs (vnode) {
		return {root: "div"};
	}

  validateAttrs (attrs) {
    let errors = validate(attrs, this.attrSchema);
		if (errors) {
			throw Error(JSON.stringify(errors));
		}
  }

  view ({attrs, children, state}) {
    return o(attrs.root, attrs.rootAttrs, children);
  }
}
