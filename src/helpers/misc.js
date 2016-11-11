export const componentIs = (componentType) => {
	return (component) => {
		if (!component.is(componentType)) {
			return "Expected a component of type '${componentType}'.";
		}
	};
};
