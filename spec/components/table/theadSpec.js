import {thead} from "./../../../src/components/table/thead.js";
import classnames from "classnames";
import {expect} from "chai";
import m from "mithril";


describe("thead", () => {
	describe("getClassList", () => {
		it("includes 'full-width'", () => {
			let got = thead.getClassList({fullWidth: true});
			expect(classnames(got)).to.have.string("full-width");
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root element to be a 'tfoot'", () => {
			expect(thead.getDefaultAttrs({}).root).to.equal("thead");
		});
	});
});
