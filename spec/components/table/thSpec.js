import {window, getVnode} from "./../../utils.js";
import {th} from "./../../../src/components/table/th.js";
import {expect} from "chai";
import _ from "mithril";


describe("th", () => {
	let vnode;

	beforeEach(() => {
		vnode = getVnode();
	});

	it("complains if invalid vertical alignment is feed.", () => {
		vnode.attrs = {verticalAlignment: "near top"};
		expect(th.oninit.bind(th, vnode)).to.throw(Error);
	});

	it("complains if invalid text alignment is feed.", () => {
		vnode.attrs = {textAlignment: "beyond right"};
		expect(th.oninit.bind(th, vnode)).to.throw(Error);
	});

	it("complains on invalid sort.", () => {
		vnode.attrs = {sort: "random"};
		expect(th.oninit.bind(th, vnode)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes proper vertical alignment", () => {
			vnode.attrs = {verticalAlignment: "top"};
			expect(th.getClassList(vnode)).to.contain("top aligned");
		});

		it("includes proper text alignment", () => {
			vnode.attrs = {textAlignment: "right"};
			expect(th.getClassList(vnode)).to.contain("right aligned");
		});

		it("includes 'collapsing'", () => {
			vnode.attrs = {collapsing: "right"};
			expect(th.getClassList(vnode)).to.contain("collapsing");
		});

		it("includes proper width", () => {
			vnode.attrs = {width: "3"};
			expect(th.getClassList(vnode)).to.contain("three wide");
		});

		it("includes proper sort", () => {
			vnode.attrs = {sort: "ascending"};
			expect(th.getClassList(vnode)).to.contain("sorted ascending");
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root element to be a 'th'", () => {
			expect(th.getDefaultAttrs({}).root).to.equal("th");
		});
	});
});
