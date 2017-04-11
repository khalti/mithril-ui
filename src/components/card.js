import {UI} from "./base.js";
import _ from "mithril";
import {colorMap, numberMap, floatMap} from "./../helpers/enums.js";


export class Card extends UI {
	getClassList ({attrs, children, state}) {
		return [
			"ui",
			attrs.fluid && "fluid",
			attrs.centered && "centered",
			attrs.raised && "raised",
			attrs.link && "link",
			colorMap[attrs.color],
			"card"
		];
	}

	view ({attrs, children, state}) {
		let tag = "div";
		if (attrs.href) {
			tag = "a";
			attrs.rootAttrs.href = attrs.href;
		}
		return _(tag, attrs.rootAttrs, children);
	}
}


export class SubCard extends Card {
	getClassList (vnode) {
		let classList = super.getClassList(vnode);
		classList.shift();
		return classList;
	}
}


export class Cards extends UI {
	getClassList ({attrs, children, state}) {
		return [
			"ui",
			attrs.link && "link",
			attrs.stackable && "stackable",
			attrs.doubling && "doubling",
			numberMap[attrs.cardCount],
			"cards"
		];
	}
}


export class CardContent extends UI {
	getClassList ({attrs}) {
		return [
			attrs.extra && "extra",
			floatMap[attrs.float],
			"content"
		];
	}
}


export class CardHeader extends UI {
	getClassList ({attrs}) {
		return [
			floatMap[attrs.float],
			"header"
		];
	}

	view ({attrs, children, state}) {
		let tag = "div";

		if (attrs.href) {
			attrs.rootAttrs.href = attrs.href;
			tag = "a";
		}
		return _(tag, attrs.rootAttrs, children);
	}
}


export class CardMeta extends UI {
	getClassList ({attrs, children, state}) {
		return [
			floatMap[attrs.float],
			"meta"
		];
	}
}


export class CardDescription extends UI {
	getClassList ({attrs, children, state}) {
		return [
			floatMap[attrs.float],
			"description"
		];
	}
}


export class CardAuthor extends UI {
	getClassList ({attrs, children, state}) {
		return [
			floatMap[attrs.float],
			"author"
		];
	}
}


export class CardTime extends UI {
	getClassList ({attrs, children, state}) {
		return [
			floatMap[attrs.float],
			"time"
		];
	}
}


export class CardCategory extends UI {
	getClassList ({attrs, children, state}) {
		return [
			floatMap[attrs.float],
			"category"
		];
	}
}
