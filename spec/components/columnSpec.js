import {column} from "./../../src/components/column.js";
import m from "mithril";
import chai from "chai";

let expect = chai.expect;

describe("column", () => {
	describe(".getClassList", () => {
		it("should return list where 'container' is the last item.", () => {
			let classList = column.getClassList({});
			expect(classList[classList.length - 1]).to.equal("column");
		});

		it("should return proper 'float' class", () => {
			let classList = column.getClassList({float: "left"});
			expect(classList[0]).to.equal(column.floatClassMap.left);
		});

		it("should return proper 'width' class", () => {
			let classList = column.getClassList({width: 8});
			expect(classList[1]).to.equal(column.widthClassMap[8]);
		});

		it("should return proper 'color' class", () => {
			let classList = column.getClassList({color: "blue"});
			expect(classList[2]).to.equal(column.colorClassMap.blue);
		});

		it("should return proper 'textAlignment' class", () => {
			let classList = column.getClassList({textAlignment: "center"});
			expect(classList[3]).to.equal(column.textAlignmentClassMap.center);
		});

		it("should return proper 'visible' class", () => {
			let classList = column.getClassList({visible: "mobile"});
			expect(classList[4]).to.equal(column.visibleClassMap.mobile);
		});

		it("should return proper 'mobile' class", () => {
			let classList = column.getClassList({mobile: 8});
			expect(classList[5]).to.equal(column.widthClassMap[8] + " mobile");
		});

		it("should return proper 'tablet' class", () => {
			let classList = column.getClassList({tablet: 8});
			expect(classList[6]).to.equal(column.widthClassMap[8] + " tablet");
		});

		it("should return proper 'computer' class", () => {
			let classList = column.getClassList({computer: 8});
			expect(classList[7]).to.equal(column.widthClassMap[8] + " computer");
		});

		it("should return proper 'largeScreen' class", () => {
			let classList = column .getClassList({largeScreen: 8});
			expect(classList[8]).to.equal(column.widthClassMap[8] + " large screen");
		});

		it("should return proper 'widescreen' class", () => {
			let classList = column.getClassList({widescreen: 8});
			expect(classList[9]).to.equal(column.widthClassMap[8] + " widescreen");
		});
	});
});
