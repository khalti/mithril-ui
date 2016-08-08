import {base} from "./base.js";
import component from "mithril-componentx";


export const feilds = component({
	base: base,
	getClassList (attrs) {
		return [
			{grouped: attrs.grouped},
			{"equal width": attrs.equalWidth},
			{inline: attrs.inline},
			"fields"
		];
	}
});
