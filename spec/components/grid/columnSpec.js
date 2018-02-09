import {window, getVnode} from "./../../utils.js";
import {Column} from "./../../../src/components/grid/column.js";
import _ from "mithril";
import {expect} from "chai";


describe("column", () => {
	let vnode, column;

	beforeEach(() => {
		column = new Column();
		vnode = getVnode();
	});

	describe(".getClassList", () => {
		it("should include 'column'", () => {
			expect(column.getClassList(vnode)).to.contain("column");
		});

		it("should include proper 'float' class", () => {
			vnode.attrs = {float: "left"};
			expect(column.getClassList(vnode)).to.contain("left floated");
		});

		it("should include proper 'width' class", () => {
			vnode.attrs = {width: 8};
			expect(column.getClassList(vnode)).to.contain("eight wide");
		});

		it("should include proper 'color' class", () => {
			vnode.attrs = {color: "blue"};
			expect(column.getClassList(vnode)).to.contain("blue");
		});

		it("should include proper 'textAlignment' class", () => {
			vnode.attrs = {textAlignment: "center"};
			expect(column.getClassList(vnode)).to.contain("center aligned");
		});

		it("should include proper 'visible' class", () => {
			vnode.attrs = {visible: ["mobile"]};
			expect(column.getClassList(vnode)).to.contain("mobile only");

			vnode.attrs = {visible: ["mobile", "computer", "largeScreen", "widescreen"]};
			expect(column.getClassList(vnode)).to.contain("mobile computer large screen widescreen only");
		});

		it("should include proper 'mobile' class", () => {
			vnode.attrs = {mobile: 8};
			expect(column.getClassList(vnode)).to.contain("eight wide mobile");
		});

		it("should include proper 'tablet' class", () => {
			vnode.attrs = {tablet: 8};
			expect(column.getClassList(vnode)).to.contain("eight wide tablet");
		});

		it("should include proper 'computer' class", () => {
			vnode.attrs = {computer: 8};
			expect(column.getClassList(vnode)).to.contain("eight wide computer");
		});

		it("should include proper 'largeScreen' class", () => {
			vnode.attrs = {largeScreen: 8};
			expect(column.getClassList(vnode)).to.contain("eight wide large screen");
		});

		it("should include proper 'widescreen' class", () => {
			vnode.attrs = {widescreen: 8};
			expect(column.getClassList(vnode)).to.contain("eight wide widescreen");
		});
	});
});
