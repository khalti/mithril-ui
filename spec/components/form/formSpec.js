import {window} from "./../../utils.js";
import {form} from "./../../../src/components/form/form.js";
import {expect} from "chai";


describe("form", () => {
	describe("getClassList", () => {
		let vnode;

		beforeEach(() => {
			vnode = {
				attrs: {},
				children: [],
				state: {}
			};
		});

		it("includes 'ui'.", () => {
			let classList = form.getClassList(vnode);
			expect(classList.join(" ")).to.have.string("ui");
		});

		it("includes 'form'.", () => {
			let classList = form.getClassList(vnode);
			expect(classList.join(" ")).to.have.string("form");
		});

		it("includes 'loading'.", () => {
			vnode.attrs.loading = true;
			let classList = form.getClassList(vnode);
			expect(classList.join(" ")).to.have.string("loading");
		});

		it("includes 'success'.", () => {
			vnode.attrs.success = true;
			let classList = form.getClassList(vnode);
			expect(classList.join(" ")).to.have.string("success");
		});

		it("includes 'error'.", () => {
			vnode.attrs.error = true;
			let classList = form.getClassList(vnode);
			expect(classList.join(" ")).to.have.string("error");
		});

		it("includes 'warning'.", () => {
			vnode.attrs.warning = true;
			let classList = form.getClassList(vnode);
			expect(classList.join(" ")).to.have.string("warning");
		});

		it("includes proper size.", () => {
			vnode.attrs.size = "mini";
			let classList = form.getClassList(vnode);
			expect(classList.join(" ")).to.have.string("mini");
		});

		it("includes 'inverted'.", () => {
			vnode.attrs.inverted = true;
			let classList = form.getClassList(vnode);
			expect(classList.join(" ")).to.have.string("inverted");
		});

		it("includes 'equal width'.", () => {
			vnode.attrs.equalWidth = true;
			let classList = form.getClassList(vnode);
			expect(classList.join(" ")).to.have.string("equal width");
		});
	});
});
