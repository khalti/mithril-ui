import {window, getVnode} from "./../../utils.js";
import {row} from "./../../../src/components/grid/row.js";
import {expect} from "chai";


describe("row", () => {
	let vnode;

	beforeEach(() => {
		vnode = getVnode();
	});

	describe(".getClassList", () => {
		it("should include 'container'.", () => {
			expect(row.getClassList(vnode)).to.contain("row");
		});

		it("should include proper 'columns' class", () => {
			vnode.attrs = {columns: 1};
			expect(row.getClassList(vnode)).to.contain("one column");
		});

		it("should include proper 'stretched' class", () => {
			vnode.attrs = {stretched: true};
			expect(row.getClassList(vnode)).to.contain("stretched");
		});

		it("should include proper 'color' class", () => {
			vnode.attrs = {color: "blue"};
			expect(row.getClassList(vnode)).to.contain("blue");
		});

		it("should include proper 'centered' class", () => {
			vnode.attrs = {centered: true};
			expect(row.getClassList(vnode)).to.contain("centered");
		});

		it("should include proper 'textAlignment' class", () => {
			vnode.attrs = {textAlignment: "center"};
			expect(row.getClassList(vnode)).to.contain("center aligned");
		});

		it("should include proper 'verticalAlignment' class", () => {
			vnode.attrs = {verticalAlignment: "bottom"};
			expect(row.getClassList(vnode)).to.contain("bottom aligned");
		});

		it("should include proper 'visible' class", () => {
			vnode.attrs = {visible: ["mobile"]};
			expect(row.getClassList(vnode)).to.contain(" mobile only");

			vnode.attrs = {visible: ["mobile", "computer"]};
			expect(row.getClassList(vnode)).to.contain(" mobile computer only");
		});

		it("should include proper 'reverse' class", () => {
			vnode.attrs = {reverse: "mobile"};
			expect(row.getClassList(vnode)).to.contain("mobile reversed");
		});
	});
});
