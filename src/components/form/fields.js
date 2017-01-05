import {base} from "./../base.js";
import component from "mithril-componentx";
import {numberMap} from "./../../helpers/enums.js";


export class Fields extends Base {
	getClassList (attrs) {
		return [
			{grouped: attrs.grouped},
			numberMap[attrs.fieldCount],
			{"equal width": attrs.equalWidth},
			{inline: attrs.inline},
			"fields"
		];
	}
}

export const fields = new Fields();
