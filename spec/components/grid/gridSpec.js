import {window, getVnode} from "./../../utils.js";
import {grid} from "./../../../src/components/grid/grid.js";
import {expect} from "chai";


describe("grid", () =>{
	let vnode;

	beforeEach(() => {
		vnode = getVnode();
	});

	describe(".getClassList", () => {
		it("should include list where 'ui' is the first item.", () => {
			expect(grid.getClassList(vnode)).to.contain("ui");
		});

		it("should include list where 'container' is the last item.", () => {
			expect(grid.getClassList(vnode)).to.contain("grid");
		});

		it("should include proper 'columns' class", () => {
			vnode.attrs = {columns: 1};
			expect(grid.getClassList(vnode)).to.contain("one column");
		});

		it("should include proper 'divide' class", () => {
			vnode.attrs = {divide: "vertically"};
			expect(grid.getClassList(vnode)).to.contain("vertically divided")
		});

		it("should include proper 'cell' class", () => {
			vnode.attrs = {cell: "internally"};
			expect(grid.getClassList(vnode)).to.contain("internally celled");
		});

		it("should include proper 'equalWidth' class", () => {
			vnode.attrs = {equalWidth: true};
			expect(grid.getClassList(vnode)).contain("equal width");
		});

		it("should include proper 'padded' class", () => {
			vnode.attrs = {padded: true};
			expect(grid.getClassList(vnode)).to.contain("padded");
		});

		it("should include proper 'relaxed' class", () => {
			vnode.attrs = {relaxed: true};
			expect(grid.getClassList(vnode)).to.contain("relaxed");
		});

		it("should include proper 'centered' class", () => {
			vnode.attrs = {centered: true};
			expect(grid.getClassList(vnode)).to.contain("centered");
		});

		it("should include proper 'textAlignment' class", () => {
			vnode.attrs = {textAlignment: "right"};
			expect(grid.getClassList(vnode)).to.contain("right aligned");
		});

		it("should include proper 'verticalAlignment' class", () => {
			vnode.attrs = {verticalAlignment: "middle"};
			expect(grid.getClassList(vnode)).to.contain("middle aligned");
		});

		it("should include proper 'doubling' class", () => {
			vnode.attrs = {doubling: true};
			expect(grid.getClassList(vnode)).to.contain("doubling");
		});

		it("should include proper 'stackable' class", () => {
			vnode.attrs = {stackable: true};
			expect(grid.getClassList(vnode)).to.contain("stackable");
		});

		it("should include proper 'reverse' class", () => {
			vnode.attrs = {reverse: "mobile"};
			expect(grid.getClassList(vnode)).to.contain("mobile reversed");
		});

		it("includes 'inverted'.", () => {
			vnode.attrs = {inverted: true};
			expect(grid.getClassList(vnode)).to.contain("inverted");
		});
	});
});
