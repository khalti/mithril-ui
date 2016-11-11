import map from "lodash/map";


export const presence = (value) => {
	if (!value) return "This field is required.";
};

export const getVdom = (component) => {
	let vdom;
	if (component && component.view) {
		vdom = component.controller
			? component.view(new component.controller())
			: component.view();

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
