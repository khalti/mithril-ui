import {window} from "./../../utils.js";
import {Form} from "./../../../src/components/form/form.js";
import {expect} from "chai";


describe("form", () => {
	describe("getClassList", () => {
		let vnode, form;

		beforeEach(() => {
			form = new Form();
			vnode = {
				attrs: {},
				children: [],
				state: {}
			};
		});

		it("includes 'ui'.", () => {
			let classList = form.getClassList(vnode);
			expect(classList).to.contain("ui");
		});

		it("includes 'form'.", () => {
			let classList = form.getClassList(vnode);
			expect(classList).to.contain("form");
		});

		it("includes 'loading'.", () => {
			vnode.attrs.loading = true;
			let classList = form.getClassList(vnode);
			expect(classList).to.contain("loading");
		});

		it("includes 'success'.", () => {
			vnode.attrs.success = true;
			let classList = form.getClassList(vnode);
			expect(classList).to.contain("success");
		});

		it("includes 'error'.", () => {
			vnode.attrs.error = true;
			let classList = form.getClassList(vnode);
			expect(classList).to.contain("error");
		});

		it("includes 'warning'.", () => {
			vnode.attrs.warning = true;
			let classList = form.getClassList(vnode);
			expect(classList).to.contain("warning");
		});

		it("includes proper size.", () => {
			vnode.attrs.size = "mini";
			let classList = form.getClassList(vnode);
			expect(classList).to.contain("mini");
		});

		it("includes 'inverted'.", () => {
			vnode.attrs.inverted = true;
			let classList = form.getClassList(vnode);
			expect(classList).to.contain("inverted");
		});

		it("includes 'equal width'.", () => {
			vnode.attrs.equalWidth = true;
			let classList = form.getClassList(vnode);
			expect(classList).to.contain("equal width");
		});
	});
});
