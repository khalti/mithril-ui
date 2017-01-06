import {Base} from "./base.js";
import _ from "mithril";
import {colorMap, numberMap, floatMap} from "./../helpers/enums.js";


export class Card extends Base {
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

export const card = new Card();

export class SubCard extends Card {
	getClassList (vnode) {
		let classList = super.getClassList(vnode);
		classList.shift();
		return classList;
	}
}

export const subCard = new SubCard();

export class Cards extends Base {
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

export const cards = new Cards()

export class CardContent extends Base {
	getClassList ({attrs}) {
		return [
			attrs.extra && "extra",
			floatMap[attrs.float],
			"content"
		];
	}
}

export const cardContent = new CardContent();

export class CardHeader extends Base {
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

export const cardHeader = new CardHeader();

export class CardMeta extends Base {
	getClassList ({attrs, children, state}) {
		return [
			floatMap[attrs.float],
			"meta"
		];
	}
}

export const cardMeta = new CardMeta();

export class CardDescription extends Base {
	getClassList ({attrs, children, state}) {
		return [
			floatMap[attrs.float],
			"description"
		];
	}
}

export const cardDescription = new CardDescription();


export class CardAuthor extends Base {
	getClassList ({attrs, children, state}) {
		return [
			floatMap[attrs.float],
			"author"
		];
	}
}

export const cardAuthor = new CardAuthor();


export class CardTime extends Base {
	getClassList ({attrs, children, state}) {
		return [
			floatMap[attrs.float],
			"time"
		];
	}
}

export const cardTime = new CardTime();

export class CardCategory extends Base {
	getClassList ({attrs, children, state}) {
		return [
			floatMap[attrs.float],
			"category"
		];
	}
}


export const cardCategory = new CardCategory();
