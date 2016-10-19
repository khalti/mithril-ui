import {buttons} from "./../../../src/components/button/buttons.js";
import m from "mithril";
import component from "mithril-componentx";
import {expect} from "chai";
import classnames from "classnames";


describe("buttons", () => {
	it("complains on invalid button count", () => {
		let abuttons = m(buttons, {buttonCount: 0});
		expect(abuttons.view.bind(abuttons)).to.throw(Error);
	});

	it("complains on invalid color", () => {
		let abuttons = m(buttons, {color: "transparent duh"});
		expect(abuttons.view.bind(abuttons)).to.throw(Error);
	});

	it("complains on invalid size", () => {
		let abuttons = m(buttons, {color: "extra huge"});
		expect(abuttons.view.bind(abuttons)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'", () => {
			let got = buttons.getClassList({});
			expect(classnames(got)).to.have.string("ui");
		});

		it("includes 'buttons'", () => {
			let got = buttons.getClassList({});
			expect(classnames(got)).to.have.string("buttons");
		});

		it("includes 'icon'", () => {
			let got = buttons.getClassList({icon: true});
			expect(classnames(got)).to.have.string("icon");
		});

		it("includes 'vertical'", () => {
			let got = buttons.getClassList({vertical: true});
			expect(classnames(got)).to.have.string("vertical");
		});

		it("includes 'labeled'", () => {
			let got = buttons.getClassList({vertical: true});
			expect(classnames(got)).to.have.string("vertical");
		});

		it("includes proper button count", () => {
			let got = buttons.getClassList({buttonCount: 1});
			expect(classnames(got)).to.have.string("one");
		});

		it("includes proper button color", () => {
			let got = buttons.getClassList({color: "red"});
			expect(classnames(got)).to.have.string("red");
		});

		it("includes 'basic'", () => {
			let got = buttons.getClassList({basic: true});
			expect(classnames(got)).to.have.string("basic");
		});

		it("includes proper button size", () => {
			let got = buttons.getClassList({size: "big"});
			expect(classnames(got)).to.have.string("big");
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root to 'div'", () => {
			expect(buttons.getDefaultAttrs({}).root).to.equal("div");
		});
	});
});
