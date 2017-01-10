import {window, getVnode} from "./../../utils.js";
import {steps} from "./../../../src/components/step/steps.js";
import {step, stepTitle} from "./../../../src/components/step/step.js";
import {expect} from "chai";
import _ from "mithril";


describe("steps", () => {
	let vnode;

	beforeEach(() => {
		vnode = getVnode();
	});

	it("complains if ''attachment is invalid.", () => {
		vnode.attrs = {attach: "somewhere", steps: [], progress: 1};
		expect(steps.oninit.bind(steps, vnode)).to.throw(Error);
	});

	it("complains if 'size' is invalid.", () => {
		vnode.attrs = {size: "extra large", steps: [], progress: 1};
		expect(steps.oninit.bind(steps, vnode)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'.", () => {
			expect(steps.getClassList(vnode)).to.contain("ui");
		});
		
		it("includes 'steps'.", () => {
			expect(steps.getClassList(vnode)).to.contain("steps");
		});

		it("includes 'ordered'.", () => {
			vnode.attrs = {ordered: true};
			expect(steps.getClassList(vnode)).to.contain("ordered");
		});

		it("includes 'vertical'.", () => {
			vnode.attrs = {vertical: true};
			expect(steps.getClassList(vnode)).to.contain("vertical");
		});

		it("includes 'fluid'.", () => {
			vnode.attrs = {fluid: true};
			expect(steps.getClassList(vnode)).to.contain("fluid");
		});

		it("includes proper attachment.", () => {
			vnode.attrs = {attach: true};
			expect(steps.getClassList(vnode)).to.contain("attached");
			// TODO: test rest of the attachments
		});

		it("includes proper steps count.", () => {
			vnode.children = [1,2,3];
			expect(steps.getClassList(vnode)).to.contain("three");
			// TODO: test rest of the count
		});

		it("includes proper size.", () => {
			vnode.attrs = {size: "mini", steps: []};
			expect(steps.getClassList(vnode)).to.contain("mini");
			// TODO: test rest of the size
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets state to '0'.", () => {
			let attrs = steps.getDefaultAttrs(vnode);
			expect(attrs.currentStep).to.equal(0);
		});

		it("sets state to one which is passed", () => {
			vnode.attrs = {currentStep: 1};
			let attrs = steps.getDefaultAttrs(vnode);
			expect(attrs.currentStep).to.equal(1);
		});
	});

	describe("view", () => {
		it("sets proper state of steps", () => {
			let attrs = {currentStep: 2};
			_.render(document.body, _(steps, attrs,
					_(step,
						_(stepTitle, "Step 1")),
					_(step,
						_(stepTitle, "Step 2")),
					_(step,
						_(stepTitle, "Step 2"))));

			let step1 = document.querySelectorAll(".step")[0];
			expect(step1.className).to.contain("completed");

			let step2 = document.querySelectorAll(".step")[1];
			expect(step2.className).to.contain("active");

			let step3 = document.querySelectorAll(".step")[2];
			expect(step3.className).to.contain("disabled");
		});
	});
});

