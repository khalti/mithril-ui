var base = require("./base.js");
var component = require("./../helpers/component.js");

export const descriptoin = component({
	extend: base,
	getClassList (attrs) {
		return ["description"];
	}
});
