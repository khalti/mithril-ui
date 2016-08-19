import component from "mithril-componentx";
import {base} from "./base.js";
import {content} from "./content.js";
import {title} from "./title.js";
import {description} from "./description.js";
import m from "mithril";


export const step = component({
	base: base,
	attrSchema: {
		title: {presence: true},
		description: {presence: true},
		state: {
			inclusion: {
				within: ["active", "completed", "disabled"],
				message: "Invalid state."
			}
		}
	},
	getClassList(attrs) {
		return [
			attrs.state,
			"step"
		];
	},
	getDefaultAttrs(attrs) {
		return {
			root: attrs.link? "a": "div"
		};
	},
	view (vnode) {
		let attrs = vnode.attrs;

		if (attrs.icon) {
			return m(attrs.root, attrs.rootAttrs,
					m(attrs.icon),
					m(content,
						m(title, attrs.title),
						m(description, attrs.description)));
		}

		return m(attrs.root, attrs.rootAttrs,
			m(title, attrs.title),
			m(description, attrs.description));
	}
});
