import {td} from "./../../../src/components/table/td.js";
import classnames from "classnames";
import {expect} from "chai";
import m from "mithril";


describe("table", () => {
	it("complains if invalid state is feed.", () => {
		let atd = m(td, {state: "high"});
		expect(atd.view.bind(atd)).to.throw(Error);
	});

	it("complains if invalid vertical alignment is feed.", () => {
		let atd = m(td, {verticalAlignment: "near top"});
		expect(atd.view.bind(atd)).to.throw(Error);
	});

	it("complains if invalid text alignment is feed.", () => {
		let atd = m(td, {textAlignment: "beyond right"});
		expect(atd.view.bind(atd)).to.throw(Error);
	});


	describe("getClassList", () => {
		it("includes proper state", () => {
			let got = td.getClassList({state: "active"});
			expect(classnames(got)).to.have.string("active");
		});

		it("includes 'selectable'", () => {
			let got = td.getClassList({selectable: "active"});
			expect(classnames(got)).to.have.string("selectable");
		});

		it("includes proper vertical alignment", () => {
			let got = td.getClassList({verticalAlignment: "top"});
			expect(classnames(got)).to.have.string("top aligned");
		});

		it("includes proper text alignment", () => {
			let got = td.getClassList({textAlignment: "right"});
			expect(classnames(got)).to.have.string("right aligned");
		});

		it("includes 'collapsing'", () => {
			let got = td.getClassList({collapsing: "right"});
			expect(classnames(got)).to.have.string("collapsing");
		});

		it("includes proper width", () => {
			let got = td.getClassList({width: "3"});
			expect(classnames(got)).to.have.string("three wide");
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root element to be a 'td'", () => {
			expect(td.getDefaultAttrs({}).root).to.equal("td");
		});
	});
});
