import {window, getVnode} from "./../utils.js";
import {
	statistic,
	statistics,
	subStatistic,
	statisticValue,
	statisticLabel
} from "./../../src/components/statistic.js";
import {expect} from "chai";


describe("statistic", () => {
	let vnode;

	beforeEach(() => {
		vnode = getVnode();
	});

	describe(".getClassList", () => {
		it("includes 'ui'", () => {
			expect(statistic.getClassList(vnode)).to.contain("ui");
		});

		it("includes 'statistic'", () => {
			expect(statistic.getClassList(vnode)).to.contain("statistic");
		});

		it("includes 'horizontal'", () => {
			vnode.attrs = {horizontal: true};
			expect(statistic.getClassList(vnode)).to.contain("horizontal");
		});

		it("includes 'inverted'", () => {
			vnode.attrs = {inverted: true};
			expect(statistic.getClassList(vnode)).to.contain("inverted");
		});

		it("includes proper color", () => {
			vnode.attrs = {color: "red"};
			expect(statistic.getClassList(vnode)).to.contain("red");
		});

		it("includes proper float", () => {
			vnode.attrs = {float: "right"};
			expect(statistic.getClassList(vnode)).to.contain("right floated");
		});

		it("includes proper size", () => {
			vnode.attrs = {size: "tiny"};
			expect(statistic.getClassList(vnode)).to.contain("tiny");
		});
	});
});

describe("statistics", () => {
	let vnode;

	beforeEach(() => {
		vnode = getVnode();
	});

	describe(".getClassList", () => {
		it("includes 'ui'", () => {
			expect(statistics.getClassList(vnode)).to.contain("ui");
		});

		it("includes 'statistics'", () => {
			expect(statistics.getClassList(vnode)).to.contain("statistics");
		});

		it("includes 'horizontal'", () => {
			vnode.attrs = {horizontal: true};
			expect(statistics.getClassList(vnode)).to.contain("horizontal");
		});

		it("includes 'inverted'", () => {
			vnode.attrs = {inverted: true};
			expect(statistics.getClassList(vnode)).to.contain("inverted");
		});

		it("includes proper color", () => {
			vnode.attrs = {color: "red"};
			expect(statistics.getClassList(vnode)).to.contain("red");
		});

		it("includes proper float", () => {
			vnode.attrs = {float: "right"};
			expect(statistics.getClassList(vnode)).to.contain("right floated");
		});

		it("includes proper size", () => {
			vnode.attrs = {size: "tiny"};
			expect(statistics.getClassList(vnode)).to.contain("tiny");
		});

		it("includes proper count", () => {
			vnode.attrs = {statisticCount: 3};
			expect(statistics.getClassList(vnode)).to.contain("three");
		});
	});
});

describe("subStatistic", () => {
	let vnode;
	
	beforeEach(() => {
		vnode = getVnode();
	});

	describe(".getClassList", () => {
		it("does not include 'ui'", () => {
			expect(subStatistic.getClassList(vnode)).to.not.contain("ui");
		});
	});
});

describe("statisticValue", () => {
	let vnode;
	
	beforeEach(() => {
		vnode = getVnode();
	});

	describe(".getClassList", () => {
		it("does not include 'value'", () => {
			expect(statisticValue.getClassList(vnode)).to.contain("value");
		});
	});
});

describe("statisticLabel", () => {
	let vnode;
	
	beforeEach(() => {
		vnode = getVnode();
	});

	describe(".getClassList", () => {
		it("does not include 'value'", () => {
			expect(statisticLabel.getClassList(vnode)).to.contain("label");
		});
	});
});
