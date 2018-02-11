import {jsdom} from "jsdom";
import {ValidationError} from 'powerform';
export const FRAME_BUDGET = 1000/60;


global.window = jsdom().defaultView;
global.document = global.window.document;

export const window = global.window;


export const trigger = (eventName, el, bubble = true, cancelable = true) => {
	let event = window.document.createEvent("Event");
	event.initEvent(eventName, bubble, cancelable);
	el.dispatchEvent(event);
};


export const getVnode = () => {
	return {
		attrs: {},
		children: [],
		state: {}
	};
};
