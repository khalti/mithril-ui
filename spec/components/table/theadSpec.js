import {window, getVnode} from "./../../utils.js";
import {THead} from "./../../../src/components/table/thead.js";
import {expect} from "chai";
import _ from "mithril";


describe("thead", () => {
	let vnode, thead;

	beforeEach(() => {
		thead = new THead();
		vnode = getVnode();
	});

	describe("getClassList", () => {
		it("includes 'full-width'", () => {
			vnode.attrs = {fullWidth: true};
			expect(thead.getClassList(vnode)).to.contain("full-width");
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root element to be a 'tfoot'", () => {
			expect(thead.getDefaultAttrs(vnode).root).to.equal("thead");
		});
	});
});
