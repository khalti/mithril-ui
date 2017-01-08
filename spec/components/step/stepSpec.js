import {window, getVnode} from "./../../utils.js";
import {step} from "./../../../src/components/step/step.js";
import _ from "mithril";
import {expect} from "chai";


describe("step", () => {
	let vnode;

	beforeEach(() => {
		vnode = getVnode();
	});

	it("complains if 'state' is absent.", () => {
		expect(step.oninit.bind(step, {index: 1})).to.throw(Error);
	});

	it("complains if 'index' is absent.", () => {
		expect(step.oninit.bind(step, {step: 0})).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'step'.", () => {
			expect(step.getClassList(vnode)).to.contain("step");
		});

		it("includes state.", () => {
			vnode.attrs = {state: 1, index: 1};
			expect(step.getClassList(vnode)).to.contain("active");

			// TODO: test rest of the states
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root to 'a'.", () => {
			vnode.attrs = {link: true};
			let attrs = step.getDefaultAttrs(vnode);
			expect(attrs.root).to.equal("a");
		});

		it("sets root to 'div'.", () => {
			vnode.attrs = {link: false};
			let attrs =	step.getDefaultAttrs(vnode);
			expect(attrs.root).to.equal("div");
		})
	});

	describe("getState", () => {
		it("returns completed.", () => {
			expect(step.getState(2, 1)).to.equal("completed");
		});

		it("returns active.", () => {
			expect(step.getState(1, 1)).to.equal("active");
		});

		it("returns disabled.", () => {
			expect(step.getState(1, 2)).to.equal("disabled");
		});
	});
});
