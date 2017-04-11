import {window} from "./../../utils.js";
import {Icons} from "./../../../src/components/icon/icons.js";
import {Icon} from "./../../../src/components/icon/icon.js";
import {expect} from "chai";


describe("icons", () => {
	it("extends 'Icon'", () => {
		expect(new Icons() instanceof Icon).to.equal(true);
	});

	describe("getClassList", () => {
		let vnode, icons;

		beforeEach(() => {
			icons = new Icons();
			vnode = {
				attrs: {},
				children: [],
				state: {}
			};
		});

		it("includes proper size", () => {
			vnode.attrs.size = "mini";
			let classList = icons.getClassList(vnode);
			expect(classList).to.contain("mini");
		});

		it("includes 'icons'", () => {
			let classList = icons.getClassList(vnode);
			expect(classList).to.contain("icons");
		});
	});
});
