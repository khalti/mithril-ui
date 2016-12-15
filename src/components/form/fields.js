import {base} from "./../base.js";
import component from "mithril-componentx";
import {numberMap} from "./../../helpers/enums.js";


export const fields = component({
	name: "fields",
	base: base,
	getClassList (attrs) {
		return [
			{grouped: attrs.grouped},
			numberMap[attrs.fieldCount],
			{"equal width": attrs.equalWidth},
			{inline: attrs.inline},
			"fields"
		];
	}
});
