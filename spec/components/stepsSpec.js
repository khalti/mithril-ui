import {steps} from "./../../src/components/steps.js";
import {expect} from "chai";
import m from "mithril";
import classnames from "classnames";


describe("steps", () => {
	it("complains if attachment is invalid.", () => {
		let step = m(steps, {attach: "somewhere"});
		expect(step.view.bind(step, {})).to.throw(Error);
	});

	it("complains if count is invalid.", () => {
		let step = m(steps, {count: 17});
		expect(step.view.bind(step, {})).to.throw(Error);
	});

	it("complains if size is invalid.", () => {
		let step = m(steps, {size: "extra large"});
		expect(step.view.bind(step, {})).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'.", () => {
			let className = classnames(steps.getClassList({}));
			expect(className).to.have.string("ui");
		});
		
		it("includes 'steps'.", () => {
			let className = classnames(steps.getClassList({}));
			expect(className).to.have.string("steps");
		});

		it("includes 'ordered'.", () => {
			let className = classnames(steps.getClassList({ordered: true}));
			expect(className).to.have.string("ordered");
		});

		it("includes 'vertical'.", () => {
			let className = classnames(steps.getClassList({vertical: true}));
			expect(className).to.have.string("vertical");
		});

		it("includes 'fluid'.", () => {
			let className = classnames(steps.getClassList({fluid: true}));
			expect(className).to.have.string("fluid");
		});

		it("includes proper attachment.", () => {
			let className = classnames(steps.getClassList({attach: true}));
			expect(className).to.have.string("attached");
			// TODO: test rest of the attachments
		});

		it("includes proper steps count.", () => {
			let className = classnames(steps.getClassList({count: 3}));
			expect(className).to.have.string("three");
			// TODO: test rest of the count
		});

		it("includes proper size.", () => {
			let className = classnames(steps.getClassList({size: "mini"}));
			expect(className).to.have.string("mini");
			// TODO: test rest of the size
		});
	});
});

