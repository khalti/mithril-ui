import component from "mithril-componentx";
import {base} from "./base.js";
import {colorClassMap, numberMap, floatMap, sizeMap} from "./../helpers/enums.js";


export const statistic = component({
	name: "statistic",
	base: base,
	getClassList (attrs) {
		return [
			"ui",
			{horizontal: attrs.horizontal},
			{inverted: attrs.inverted},
			colorClassMap[attrs.color],
			floatMap[attrs.float],
			sizeMap[attrs.size],
			"statistic"
		];
	}
});


export const statistics = component({
	name: "statistics",
	base: base,
	getClassList (attrs) {
		return [
			"ui",
			{horizontal: attrs.horizontal},
			{inverted: attrs.inverted},
			colorClassMap[attrs.color],
			numberMap[attrs.statisticCount],
			sizeMap[attrs.size],
			floatMap[attrs.float],
			"statistics"
		];
	}
});


export const subStatistic = component({
	name: "subStatistic",
	base: statistic,
	getClassList (attrs) {
		let classes = this.base.getClassList(attrs);
		classes.shift();
		return classes;
	}
});


export const value = component({
	name: "statisticValue",
	base: base,
	getClassList (attrs) {
		return ["value"];
	}
});


export const label = component({
	name: "statisticLabel",
	base: base,
	getClassList (attrs) {
		return ["label"];
	}
});
