import {form} from "./../../../src/components/form/form.js";
import {expect} from "chai";
import classnames from "classnames";
import m from "mithril";


describe("form", () => {
	it("complains if invalid size is given.", () => {
		let aForm = m(form, {size: "extra-large"});
		expect(aForm.view.bind(aForm)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'.", () => {
			let className = classnames(form.getClassList({}));
			expect(className).to.have.string("ui");
		});

		it("includes 'form'.", () => {
			let className = classnames(form.getClassList({}));
			expect(className).to.have.string("form");
		});

		it("includes 'loading'.", () => {
			let className = classnames(form.getClassList({loading: true}));
			expect(className).to.have.string("loading");
		});

		it("includes 'success'.", () => {
			let className = classnames(form.getClassList({success: true}));
			expect(className).to.have.string("success");
		});

		it("includes 'error'.", () => {
			let className = classnames(form.getClassList({error: true}));
			expect(className).to.have.string("error");
		});

		it("includes 'warning'.", () => {
			let className = classnames(form.getClassList({warning: true}));
			expect(className).to.have.string("warning");
		});

		it("includes proper size.", () => {
			let className = classnames(form.getClassList({size: "tiny"}));
			expect(className).to.have.string("tiny");
		});

		it("includes 'inverted'.", () => {
			let className = classnames(form.getClassList({inverted: true}));
			expect(className).to.have.string("inverted");
		});

		it("includes 'equal width'.", () => {
			let className = classnames(form.getClassList({equalWidth: true}));
			expect(className).to.have.string("equal width");
		});
	});
});
