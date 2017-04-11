import {UI} from "./base.js";
import {verticalAlignmentMap} from "./../helpers/enums.js";


export class Items extends UI {
	getClassList ({attrs}) {
		return [
			"ui",
			attrs.divided && "divided",
			attrs.relaxed && "relaxed",
			attrs.veryRelaxed && "very relaxed",
			attrs.link && "link",
			"items"
		];
	}
}


export class Item extends UI {
	getClassList (vnode) {
		return ["item"];
	}
}


export class ItemContent extends UI {
	getClassList ({attrs, children, state}) {
		return [
			verticalAlignmentMap[attrs.verticalAlignment],
			"content"
		];
	}
}


export class ItemHeader extends UI {
	getDefaultAttrs ({attrs}) {
		if (attrs.link) {
			return {root: "a"};
		}

		return {root: "div"};
	}

	getClassList ({attrs}) {
		return [
			"header"
		];
	}
}


export class ItemMeta extends UI {
	getClassList ({attrs}) {
		return [
			"meta"
		];
	}
}


export class ItemDescription extends UI {
	getClassList ({attrs}) {
		return [
			"description"
		];
	}
}


export class ItemExtra extends UI {
	getClassList ({attrs}) {
		return [
			"extra"
		];
	}
}
