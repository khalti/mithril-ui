import {th} from "./../../../src/components/table/th.js";
import classnames from "classnames";
import {expect} from "chai";
import m from "mithril";


describe("th", () => {
	it("complains if invalid vertical alignment is feed.", () => {
		let ath = m(th, {verticalAlignment: "near top"});
		expect(ath.view.bind(ath)).to.throw(Error);
	});

	it("complains if invalid text alignment is feed.", () => {
		let ath = m(th, {textAlignment: "beyond right"});
		expect(ath.view.bind(ath)).to.throw(Error);
	});

	it("complains on invalid sort.", () => {
		let ath = m(th, {sort: "random"});
		expect(ath.view.bind(ath)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes proper vertical alignment", () => {
			let got = th.getClassList({verticalAlignment: "top"});
			expect(classnames(got)).to.have.string("top aligned");
		});

		it("includes proper text alignment", () => {
			let got = th.getClassList({textAlignment: "right"});
			expect(classnames(got)).to.have.string("right aligned");
		});

		it("includes 'collapsing'", () => {
			let got = th.getClassList({collapsing: "right"});
			expect(classnames(got)).to.have.string("collapsing");
		});

		it("includes proper width", () => {
			let got = th.getClassList({width: "3"});
			expect(classnames(got)).to.have.string("three wide");
		});

		it("includes proper sort", () => {
			let got = th.getClassList({sorte: "ascending"});
			expect(classnames(got)).to.have.string("sorted ascending");
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root element to be a 'th'", () => {
			expect(th.getDefaultAttrs({}).root).to.equal("th");
		});
	});
});
