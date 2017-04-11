import {window, getVnode} from "./../../utils.js";
import {TD} from "./../../../src/components/table/td.js";
import {expect} from "chai";
import _ from "mithril";


describe("TD", () => {
	let vnode, td;

	beforeEach(() => {
		td = new TD();
		vnode = getVnode();
	});

	it("complains if invalid state is feed.", () => {
		vnode.attrs = {state: "high"};
		expect(td.oninit.bind(td, vnode)).to.throw(Error);
	});

	it("complains if invalid vertical alignment is feed.", () => {
		vnode.attrs = {verticalAlignment: "near top"};
		expect(td.oninit.bind(td, vnode)).to.throw(Error);
	});

	it("complains if invalid text alignment is feed.", () => {
		vnode.attrs = {textAlignment: "beyond right"};
		expect(td.oninit.bind(td, vnode)).to.throw(Error);
	});


	describe("getClassList", () => {
		it("includes proper state", () => {
			vnode.attrs = {state: "active"};
			expect(td.getClassList(vnode)).to.contain("active");
		});

		it("includes 'selectable'", () => {
			vnode.attrs = {selectable: "active"};
			expect(td.getClassList(vnode)).to.contain("selectable");
		});

		it("includes proper vertical alignment", () => {
			vnode.attrs = {verticalAlignment: "top"};
			expect(td.getClassList(vnode)).to.contain("top aligned");
		});

		it("includes proper text alignment", () => {
			vnode.attrs = {textAlignment: "right"};
			expect(td.getClassList(vnode)).to.contain("right aligned");
		});

		it("includes 'collapsing'", () => {
			vnode.attrs = {collapsing: "right"};
			expect(td.getClassList(vnode)).to.contain("collapsing");
		});

		it("includes proper width", () => {
			vnode.attrs = {width: "3"};
			expect(td.getClassList(vnode)).to.contain("three wide");
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root element to be a 'td'", () => {
			expect(td.getDefaultAttrs({}).root).to.equal("td");
		});
	});
});
