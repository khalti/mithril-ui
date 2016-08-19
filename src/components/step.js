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
		state: {presence: true},
		index: {presence: true}
	},
	getState (state, index) {
		if (index < state) return "completed";
		if (index === state) return "active";
		if (index > state) return "disabled";
	},
	getClassList(attrs) {
		return [
			attrs.state,
			"step"
		];
	},
	getDefaultAttrs(attrs) {
		return {
			root: attrs.link? "a": "div",
			state: this.getState(attrs.state(), attrs.index)
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
