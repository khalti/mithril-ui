var base = require("./base.js");
var component = require("./../helpers/component.js");

export const feilds = component({
	extend: base,
	getClassList (attrs) {
		return ["fields"];
	}
});
