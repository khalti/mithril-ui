export const isObject = (data) => {
	return Object(data) === data;
};

export const isArray = (data) => {
	return Array.isArray(data);
};

export const isFunction = (data) => {
	throw Error("Implement this.");
};

export const isString = (data) => {
	return typeof data === 'string' || data instanceof String;
};
