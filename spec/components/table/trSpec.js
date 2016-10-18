import {tr} from "./../../../src/components/table/tr.js";
import classnames from "classnames";
import {expect} from "chai";
import m from "mithril";


describe("tr", () => {
	it("complains if invalid vertical alignment is feed.", () => {
		let atr = m(tr, {verticalAlignment: "near top"});
		expect(atr.view.bind(atr)).to.throw(Error);
	});

	it("complains if invalid text alignment is feed.", () => {
		let atr = m(tr, {textAlignment: "beyond right"});
		expect(atr.view.bind(atr)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes proper vertical alignment", () => {
			let got = tr.getClassList({verticalAlignment: "top"});
			expect(classnames(got)).to.have.string("top aligned");
		});

		it("includes proper text alignment", () => {
			let got = tr.getClassList({textAlignment: "right"});
			expect(classnames(got)).to.have.string("right aligned");
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root element to be a 'td'", () => {
			expect(tr.getDefaultAttrs({}).root).to.equal("tr");
		});
	});
});
