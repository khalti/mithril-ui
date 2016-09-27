import m from "mithril";
import component from "mithril-componentx";
import {required, within} from "validatex";


export const modal = component({
	view ({attrs, children, state}) {
		return m(".content", attrs.rootAttrs,
				m(".center", children));
	}
});
