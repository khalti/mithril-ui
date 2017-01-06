export const componentIs = (componentType) => {
	return (component) => {
		if (!component.is(componentType)) {
			return "Expected a component of type '${componentType}'.";
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
