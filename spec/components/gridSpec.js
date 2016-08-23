import {grid} from "./../../src/components/grid.js";
import chai from "chai";
import classnames from "classnames";

let expect = chai.expect;


describe("grid", () =>{
	describe(".getClassList", () => {
		it("should include list where 'ui' is the first item.", () => {
			let className = classnames(grid.getClassList({}));
			expect(className).to.have.string("ui");
		});

		it("should include list where 'container' is the last item.", () => {
			let className = classnames(grid.getClassList({}));
			expect(className).to.have.string("grid");
		});

		it("should include proper 'columns' class", () => {
			let className = classnames(grid.getClassList({columns: 1}));
			expect(className).to.have.string("one column");
		});

		it("should include proper 'divide' class", () => {
			let className = classnames(grid.getClassList({divide: "vertically"}));
			expect(className).to.have.string("vertically divided")
		});

		it("should include proper 'cell' class", () => {
			var className = classnames(grid.getClassList({cell: "internally"}));
			expect(className).to.have.string("internally celled");
		});

		it("should include proper 'equalWidth' class", () => {
			let className = classnames(grid.getClassList({equalWidth: true}));
			expect(className).to.have.string("equal width");
		});

		it("should include proper 'padded' class", () => {
			let className = classnames(grid.getClassList({padded: true}));
			expect(className).to.have.string("padded");
		});

		it("should include proper 'relaxed' class", () => {
			let className = classnames(grid.getClassList({relaxed: true}));
			expect(className).to.have.string("relaxed");
		});

		it("should include proper 'centered' class", () => {
			let className = classnames(grid.getClassList({centered: true}));
			expect(className).to.have.string("centered");
		});

		it("should include proper 'textAlignment' class", () => {
			let className = classnames(grid.getClassList({textAlignment: "right"}));
			expect(className).to.have.string("right aligned");
		});

		it("should include proper 'verticalAlignment' class", () => {
			let className = classnames(grid.getClassList({verticalAlignment: "middle"}));
			expect(className).to.have.string("middle aligned");
		});

		it("should include proper 'doubling' class", () => {
			let className = classnames(grid.getClassList({doubling: true}));
			expect(className).to.have.string("doubling");
		});

		it("should include proper 'stackable' class", () => {
			let className = classnames(grid.getClassList({stackable: true}));
			expect(className).to.have.string("stackable");
		});

		it("should include proper 'reverse' class", () => {
			let className = classnames(grid.getClassList({reverse: "mobile"}));
			expect(className).to.have.string("mobile reversed");
		});

		it("includes 'inverted'.", () => {
			let className = classnames(grid.getClassList({inverted: true}));
			expect(className).to.have.string("inverted");
		});
	});
});
