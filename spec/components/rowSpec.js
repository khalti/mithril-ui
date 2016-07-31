import {row} from "./../../src/components/row.js";
import chai from "chai";

let expect = chai.expect;

describe("row", () => {
	describe(".getClassList", () => {
		it("should return list where 'container' is the last item.", () => {
			let classList = row.getClassList({});
			expect(classList[classList.length - 1]).to.equal("row");
		});

		it("should return proper 'columns' class", () => {
			let classList = row.getClassList({columns: 1});
			expect(classList[0]).to.equal(row.columnsClassMap[1]);
		});

		it("should return proper 'stretched' class", () => {
			let classList = row.getClassList({stretched: true});
			expect(classList[1]).to.equal(row.stretchedClassMap.true);
		});

		it("should return proper 'color' class", () => {
			let classList = row.getClassList({color: "blue"});
			expect(classList[2]).to.equal(row.colorClassMap.blue);
		});

		it("should return proper 'centered' class", () => {
			let classList = row.getClassList({centered: true});
			expect(classList[3]).to.equal(row.centeredClassMap.true);
		});

		it("should return proper 'textAlignment' class", () => {
			let classList = row.getClassList({textAlignment: "center"});
			expect(classList[4]).to.equal(row.textAlignmentClassMap.center);
		});

		it("should return proper 'verticalAlignment' class", () => {
			let classList = row.getClassList({verticalAlignment: "bottom"});
			expect(classList[5]).to.equal(row.verticalAlignmentClassMap.bottom);
		});

		it("should return proper 'visible' class", () => {
			let classList = row.getClassList({visible: "mobile"});
			expect(classList[6]).to.equal(row.visibleClassMap.mobile);
		});

		it("should return proper 'reverse' class", () => {
			let classList = row.getClassList({reverse: "mobile"});
			expect(classList[7]).to.equal(row.reverseClassMap.mobile);
		});
	});
});
