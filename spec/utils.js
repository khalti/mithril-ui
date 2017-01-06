import map from "lodash/map";
import {jsdom} from "jsdom";

export const FRAME_BUDGET = 1000/60;


export const presence = (value) => {
	if (!value) return "This field is required.";
};


global.window = jsdom().defaultView;
global.document = global.window.document;

export const window = global.window;


export const trigger = (eventName, el, bubble = true, cancelable = true) => {
	let event = window.document.createEvent("Event");
	event.initEvent(eventName, bubble, cancelable);
	el.dispatchEvent(event);
};
