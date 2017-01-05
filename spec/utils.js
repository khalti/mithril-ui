import map from "lodash/map";
import _ from "mithril";


export const presence = (value) => {
	if (!value) return "This field is required.";
};

export const getVdom = (component, attrs = {}) => {
	let vdom;
	if (component && component.view) {
		let vnode = _(component, attrs);

		vnode.oninit && vnode.oninit(vnode);

		vdom = vnode.view({
			attrs: vnode.attrs,
			children: vnode.children,
			state: vnode.state
		});

		if (vdom.children && vdom.children.length > 0) {
			vdom.children = map(vdom.children, (child) => {
				return getVdom(child);
			});
		}
	}
	else {
		vdom = component;
	}
	return vdom;
};
