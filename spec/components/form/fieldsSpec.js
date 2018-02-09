import {window} from "./../../utils.js";
import {Fields} from "./../../../src/components/form/fields.js";
import {expect} from "chai";


describe("fields", () => {
	describe("getClassList", () => {
		let vnode, fields;

		beforeEach(() => {
			fields = new Fields();
			vnode = {
				attrs: {},
				children: [],
				state: {}
			};
		});

		it("includes 'grouped'", () => {
			vnode.attrs.grouped = true;
			let classList = fields.getClassList(vnode);
			expect(classList).to.contain("grouped");
		});

		it("includes proper field count", () => {
			vnode.attrs.fieldCount = 2;
			let classList = fields.getClassList(vnode);
			expect(classList).to.contain("two");
		});

		it("includes 'equal width'", () => {
			vnode.attrs.equalWidth = true;
			let classList = fields.getClassList(vnode);
			expect(classList).to.contain("equal width");
		});

		it("includes 'equal width'", () => {
			vnode.attrs.inline = true;
			let classList = fields.getClassList(vnode);
			expect(classList).to.contain("inline");
		});

		it("includes 'fields'", () => {
			let classList = fields.getClassList(vnode);
			expect(classList).to.contain("fields");
		});
	});
});
