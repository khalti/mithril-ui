import {window, getVnode} from "./../../utils.js";
import {TR} from "./../../../src/components/table/tr.js";
import {expect} from "chai";
import _ from "mithril";


describe("tr", () => {
	let vnode, tr;

	beforeEach(() => {
		tr = new TR();
		vnode = getVnode();
	});

	it("complains if invalid vertical alignment is feed.", () => {
		vnode.attrs = {verticalAlignment: "near top"};
		expect(tr.oninit.bind(tr, vnode)).to.throw(Error);
	});

	it("complains if invalid text alignment is feed.", () => {
		vnode.attrs = {textAlignment: "beyond right"};
		expect(tr.oninit.bind(tr, vnode)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes proper vertical alignment", () => {
			vnode.attrs = {verticalAlignment: "top"};
			expect(tr.getClassList(vnode)).to.contain("top aligned");
		});

		it("includes proper text alignment", () => {
			vnode.attrs = {textAlignment: "right"};
			expect(tr.getClassList(vnode)).to.contain("right aligned");
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root element to be a 'td'", () => {
			expect(tr.getDefaultAttrs({}).root).to.equal("tr");
		});
	});
});
