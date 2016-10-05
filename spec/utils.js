import map from "lodash/map";


let presence = (value) => {
	if (!value) return "This field is required.";
};

let getVdom = (component) => {
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

export {getVdom, presence}
