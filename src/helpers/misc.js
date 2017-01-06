import {isArray} from "./type.js";

export const is = (instance, base) => {
	return instance instanceof base;
};

export const componentIs = (componentTypes) => {
	return (component) => {
		let _componentIs = (componentType) => {
			return component instanceof componentType;
		}

		if (!isArray(componentTypes)) {
			componentTypes = [componentTypes];
		}

		if (!componentTypes.some(_componentIs)) {
			return `Expected a component of type '${componentType}'.`;
		}
	};
};


export const properKeys = (obj) => {
	return Object.keys(obj).map((akey) => {
		var properKey = parseInt(akey);
		if(properKey) {
			return properKey;
		}
		else {
			return akey;
		}
	});
}
