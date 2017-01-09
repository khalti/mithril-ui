import {UI} from "./base.js";
import {colorMap, numberMap, floatMap, sizeMap} from "./../helpers/enums.js";


export class Statistic extends UI {
	getClassList ({attrs}) {
		return [
			"ui",
			attrs.horizontal && "horizontal",
			attrs.inverted && "inverted",
			colorMap[attrs.color],
			floatMap[attrs.float],
			sizeMap[attrs.size],
			"statistic"
		];
	}
}

export const statistic = new Statistic();

export class Statistics extends UI {
	getClassList ({attrs}) {
		return [
			"ui",
			attrs.horizontal && "horizontal",
			attrs.inverted && "inverted",
			colorMap[attrs.color],
			numberMap[attrs.statisticCount],
			sizeMap[attrs.size],
			floatMap[attrs.float],
			"statistics"
		];
	}
}

export const statistics = new Statistics();

export class SubStatistic extends Statistic {
	getClassList (vnode) {
		let classes = super.getClassList(vnode);
		classes.shift();
		return classes;
	}
}

export const subStatistic = new SubStatistic();

export class StatisticValue extends UI {
	getClassList ({attrs}) {
		return ["value"];
	}
}

export const statisticValue = new StatisticValue();

export class StatisticLabel extends UI {
	getClassList ({attrs}) {
		return ["label"];
	}
}

export const statisticLabel = new StatisticLabel();
