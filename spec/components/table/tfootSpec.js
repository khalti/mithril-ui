import {window, getVnode} from "./../../utils.js";
import {tfoot} from "./../../../src/components/table/tfoot.js";
import {expect} from "chai";
import _ from "mithril";


describe("tfoot", () => {
	let vnode;

	beforeEach(() => {
		vnode = getVnode();
	});

	describe("getClassList", () => {
		it("includes 'full-width'", () => {
			vnode.attrs = {fullWidth: true};
			expect(tfoot.getClassList(vnode)).to.contain("full-width");
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root element to be a 'tfoot'", () => {
			expect(tfoot.getDefaultAttrs(vnode).root).to.equal("tfoot");
		});
	});
});
