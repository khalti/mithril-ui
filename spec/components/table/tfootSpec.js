import {tfoot} from "./../../../src/components/table/tfoot.js";
import classnames from "classnames";
import {expect} from "chai";
import m from "mithril";


describe("tfoot", () => {
	describe("getClassList", () => {
		it("includes 'full-width'", () => {
			let got = tfoot.getClassList({fullWidth: true});
			expect(classnames(got)).to.have.string("full-width");
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root element to be a 'tfoot'", () => {
			expect(tfoot.getDefaultAttrs({}).root).to.equal("tfoot");
		});
	});
});
