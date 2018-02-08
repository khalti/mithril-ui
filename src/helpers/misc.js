import {isArray} from "./type.js";

export const is = (subClass, base) => {
	if (!subClass.prototype) return false;
	return new subClass() instanceof base;
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


export const firstMatch = (collection, predicate) => {
	for (let i = 0; i < collection.length; i++) {
		if (predicate(collection[i])) return collection[i];
	}
}

export const clone = (item) => {
	return JSON.parse(JSON.stringify(item));
};

export const includes = (collection, value, fromIndex=0) => {
	if (!fromIndex) {
		fromIndex = 0;
	}
	if (fromIndex < 0) {
		fromIndex = 0;
	}
	return collection.indexOf(value, fromIndex) !== -1;
}
