import map from "lodash/map";
import {jsdom} from "jsdom";

export const FRAME_BUDGET = 1000/60;


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

global.window = jsdom().defaultView;
global.document = global.window.document;

export const window = global.window;

export const click = (el) => {
	let event = window.document.createEvent("Event");
	event.initEvent("click", true, true);
	el.dispatchEvent(event);
}
