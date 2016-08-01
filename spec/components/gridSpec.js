import {grid} from "./../../src/components/grid.js";
import chai from "chai";

let expect = chai.expect;


describe("grid", () =>{
	describe(".getClassList", () => {
		it("should return list where 'ui' is the first item.", () => {
			expect(grid.getClassList({})[0]).to.equal("ui");
		});

		it("should return list where 'container' is the last item.", () => {
			let classList = grid.getClassList({});
			expect(classList[classList.length - 1]).to.equal("grid");
		});

		it("should return proper 'columns' class", () => {
			let classList = grid.getClassList({columns: 1});
			expect(classList[1]).to.equal(grid.columnsClassMap[1]);
		});

		it("should return proper 'divide' class", () => {
			let classList = grid.getClassList({divide: "vertically"});
			expect(classList[2]).to.equal(grid.divideClassMap.vertically);
		});

		it("should return proper 'cell' class", () => {
			var classList = grid.getClassList({cell: "internally"});
			expect(classList[3]).to.equal(grid.cellClassMap.internally);
		});

		it("should return proper 'equalWidth' class", () => {
			let classList = grid.getClassList({equalWidth: true});
			expect(classList[4]).to.equal(grid.equalWidthClassMap.true);
		});

		it("should return proper 'padded' class", () => {
			let classList = grid.getClassList({padded: true});
			expect(classList[5]).to.equal(grid.paddedClassMap.true);
		});

		it("should return proper 'relaxed' class", () => {
			let classList = grid.getClassList({relaxed: true});
			expect(classList[6]).to.equal(grid.relaxedClassMap.true);
		});

		it("should return proper 'centered' class", () => {
			let classList = grid.getClassList({centered: true});
			expect(classList[7]).to.equal(grid.centeredClassMap.true);
		});

		it("should return proper 'textAlignment' class", () => {
			let classList = grid.getClassList({textAlignment: "right"});
			expect(classList[8]).to.equal(grid.textAlignmentClassMap.right);
		});

		it("should return proper 'verticalAlignment' class", () => {
			let classList = grid.getClassList({verticalAlignment: true});
			expect(classList[9]).to.equal(grid.verticalAlignmentClassMap.true);
		});

		it("should return proper 'doubling' class", () => {
			let classList = grid.getClassList({doubling: true});
			expect(classList[10]).to.equal(grid.doublingClassMap.true);
		});

		it("should return proper 'stackable' class", () => {
			let classList = grid.getClassList({stackable: true});
			expect(classList[11]).to.equal(grid.stackableClassMap.true);
		});

		it("should return proper 'reverse' class", () => {
			let classList = grid.getClassList({reverse: "mobile"});
			expect(classList[12]).to.equal(grid.reverseClassMap.mobile);
		});
	});
});
