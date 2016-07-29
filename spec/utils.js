import map from "lodash/map";

let getVdom = (component) => {
	let vdom;
	if (component && component.view) {
		vdom = component.view();

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

export {getVdom}
