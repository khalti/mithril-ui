import {
	statistic,
	statistics,
	subStatistic,
	statisticValue,
	statisticLabel
} from "./../../src/components/statistic.js";
import {expect} from "chai";
import classnames from "classnames";


describe("statistic", () => {
	describe(".getClassList", () => {
		it("includes 'ui'", () => {
			let classes = statistic.getClassList({});
			expect(classnames(classes)).to.contain("ui");
		});

		it("includes 'statistic'", () => {
			let classes = statistic.getClassList({});
			expect(classnames(classes)).to.contain("statistic");
		});

		it("includes 'horizontal'", () => {
			let classes = statistic.getClassList({horizontal: true});
			expect(classnames(classes)).to.contain("horizontal");
		});

		it("includes 'inverted'", () => {
			let classes = statistic.getClassList({inverted: true});
			expect(classnames(classes)).to.contain("inverted");
		});

		it("includes proper color", () => {
			let classes = statistic.getClassList({color: "red"});
			expect(classnames(classes)).to.contain("red");
		});

		it("includes proper float", () => {
			let classes = statistic.getClassList({float: "right"});
			expect(classnames(classes)).to.contain("right floated");
		});

		it("includes proper size", () => {
			let classes = statistic.getClassList({size: "tiny"});
			expect(classnames(classes)).to.contain("tiny");
		});
	});
});

describe("statistics", () => {
	describe(".getClassList", () => {
		it("includes 'ui'", () => {
			let classes = statistics.getClassList({});
			expect(classnames(classes)).to.contain("ui");
		});

		it("includes 'statistics'", () => {
			let classes = statistics.getClassList({});
			expect(classnames(classes)).to.contain("statistics");
		});

		it("includes 'horizontal'", () => {
			let classes = statistics.getClassList({horizontal: true});
			expect(classnames(classes)).to.contain("horizontal");
		});

		it("includes 'inverted'", () => {
			let classes = statistics.getClassList({inverted: true});
			expect(classnames(classes)).to.contain("inverted");
		});

		it("includes proper color", () => {
			let classes = statistics.getClassList({color: "red"});
			expect(classnames(classes)).to.contain("red");
		});

		it("includes proper float", () => {
			let classes = statistics.getClassList({float: "right"});
			expect(classnames(classes)).to.contain("right floated");
		});

		it("includes proper size", () => {
			let classes = statistics.getClassList({size: "tiny"});
			expect(classnames(classes)).to.contain("tiny");
		});

		it("includes proper count", () => {
			let classes = statistics.getClassList({statisticCount: 3});
			expect(classnames(classes)).to.contain("three");
		});
	});
});

describe("subStatistic", () => {
	describe(".getClassList", () => {
		it("does not include 'ui'", () => {
			let classes = subStatistic.getClassList({});
			expect(classnames(classes)).to.not.contain("ui");
		});
	});
});

describe("statisticValue", () => {
	describe(".getClassList", () => {
		it("does not include 'value'", () => {
			let classes = value.getClassList({});
			expect(classnames(classes)).to.contain("value");
		});
	});
});

describe("statisticLabel", () => {
	describe(".getClassList", () => {
		it("does not include 'value'", () => {
			let classes = label.getClassList({});
			expect(classnames(classes)).to.contain("label");
		});
	});
});
