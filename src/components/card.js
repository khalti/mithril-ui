import {base} from "./base.js";
import component from "mithril-componentx";
import _ from "mithril";


export const card = component({
	name: "card",
	base: base,
	getClassList (attrs) {
		return [
			"ui",
			{fluid: attrs.fluid},
			{centered: attrs.centered},
			{raised: attrs.raised},
			{link: attrs.link},
			"card"
		];
	},
	view ({attrs, children, state}) {
		let tag = "div";
		if (attrs.href) {
			tag = "a";
			attrs.rootAttrs.href = attrs.href;
		}
		return _(tag, attrs.rootAttrs, children);
	}
});


export const subCard = component({
	name: "subCard",
	base: base,
	getClassList ({attrs, children, state}) {
		return ["card"];
	}
});


export const cards = component({
	name: "cards",
	base: base,
	getClassList ({attrs, children, state}) {
		return [
			"ui",
			{link: attrs.link},
			"cards"
		];
	}
});


export const content = component({
	name: "cardContent",
	base: base,
	getClassList ({attrs, children, state}) {
		return [
			{extra: attrs.extra},
			"content"
		];
	}
});


export const header = component({
	name: "cardHeader",
	base: base,
	getClassList (attrs) {
		return [
			"header"
		];
	},
	view ({attrs, children, state}) {
		let tag = "div";

		if (attrs.href) {
			attrs.rootAttrs.href = attrs.href;
			tag = "a";
		}
		return _(tag, attrs.rootAttrs, children);
	}
});


export const meta = component({
	name: "cardMeta",
	base: base,
	getClassList ({attrs, children, state}) {
		return [
			"meta"
		];
	}
});


export const description = component({
	name: "cardDescription",
	base: base,
	getClassList ({attrs, children, state}) {
		return [
			"description"
		];
	}
});


export const author = component({
	name: "cardAuthor",
	base: base,
	getClassList ({attrs, children, state}) {
		return [
			"author"
		];
	}
});


export const time = component({
	name: "cardTime",
	base: base,
	getClassList ({attrs, children, state}) {
		return [
			"time"
		];
	}
});

export const category = component({
	name: "cardCategory",
	base: base,
	getClassList ({attrs, children, state}) {
		return [
			"category"
		];
	}
});
