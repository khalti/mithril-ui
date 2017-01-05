import {Base} from "./base.js";
import {colorClassMap, numberMap, floatMap, sizeMap} from "./../helpers/enums.js";


export class Statistic extends Base {
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
}

export const statistic = new Statistic();

export class Statistics extends Base {
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
}

export const statistics = new Statistics();

export class SubStatistic extends Statistic {
	getClassList (attrs) {
		let classes = this.base.getClassList(attrs);
		classes.shift();
		return classes;
	}
}

export const subStatistics = new SubStatistic();

export class StatisticValue extends Base {
	getClassList (attrs) {
		return ["value"];
	}
}

export const statisticValue = new StatisticValue();

export class StatisticLabel extends Base {
	getClassList (attrs) {
		return ["label"];
	}
}

export const statisticLabel = new StatisticLabel();
