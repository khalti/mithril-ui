import {steps} from "./../../src/components/steps.js";
import {expect} from "chai";
import m from "mithril";
import classnames from "classnames";


describe("steps", () => {
	it("complains if ''attachment is invalid.", () => {
		let step = m(steps, {attach: "somewhere", steps: [], progress: 1});
		expect(step.view.bind(step, {})).to.throw(Error);
	});

	it("complains if 'size' is invalid.", () => {
		let step = m(steps, {size: "extra large", steps: [], progress: 1});
		expect(step.view.bind(step, {})).to.throw(Error);
	});

	it("complains if 'steps' is absent.", () => {
		let step = m(steps, {progress: 1});
		expect(step.view.bind(step, {})).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'.", () => {
			let className = classnames(steps.getClassList({steps: {}}));
			expect(className).to.have.string("ui");
		});
		
		it("includes 'steps'.", () => {
			let className = classnames(steps.getClassList({steps: {}}));
			expect(className).to.have.string("steps");
		});

		it("includes 'ordered'.", () => {
			let className = classnames(steps.getClassList({ordered: true, steps: []}));
			expect(className).to.have.string("ordered");
		});

		it("includes 'vertical'.", () => {
			let className = classnames(steps.getClassList({vertical: true, steps: []}));
			expect(className).to.have.string("vertical");
		});

		it("includes 'fluid'.", () => {
			let className = classnames(steps.getClassList({fluid: true, steps: []}));
			expect(className).to.have.string("fluid");
		});

		it("includes proper attachment.", () => {
			let className = classnames(steps.getClassList({attach: true, steps: []}));
			expect(className).to.have.string("attached");
			// TODO: test rest of the attachments
		});

		it("includes proper steps count.", () => {
			let className = classnames(steps.getClassList({steps: [1,2,3]}));
			expect(className).to.have.string("three");
			// TODO: test rest of the count
		});

		it("includes proper size.", () => {
			let className = classnames(steps.getClassList({size: "mini", steps: []}));
			expect(className).to.have.string("mini");
			// TODO: test rest of the size
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets state to '0'.", () => {
			let attrs = steps.getDefaultAttrs({});
			expect(attrs.state).to.equal(0);
		});

		it("sets state to one which is passed", () => {
			let attrs = steps.getDefaultAttrs({state: m.prop(1)});
			expect(attrs.state()).to.equal(1);
		});
	});

	describe("view", () => {
		it("displays steps and children", () => {
			let step1 = {title: "a title"};
			let step2 = {title: "a title"};

			let dStepsCom = m(steps, { steps: [step1, step2] });
			let vdom = dStepsCom.view(dStepsCom.controller());
			expect(vdom.children.length).to.equal(2);
		});
	});
});

