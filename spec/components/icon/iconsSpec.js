import {window} from "./../../utils.js";
import {icons} from "./../../../src/components/icon/icons.js";
import {Icon} from "./../../../src/components/icon/icon.js";
import {expect} from "chai";


describe("icons", () => {
	it("extends 'Icon'", () => {
		expect(icons instanceof Icon).to.equal(true);
	});

	describe("getClassList", () => {
		let vnode;

		beforeEach(() => {
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
