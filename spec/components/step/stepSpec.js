import {window, getVnode} from "./../../utils.js";
import {Step} from "./../../../src/components/step/step.js";
import _ from "mithril";
import {expect} from "chai";


describe("step", () => {
	let vnode, step;

	beforeEach(() => {
		step = new Step();
		vnode = getVnode();
	});

	it("complains if 'state' is absent.", () => {
		expect(step.oninit.bind(step, {index: 1})).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'step'.", () => {
			expect(step.getClassList(vnode)).to.contain("step");
		});

		it("includes state.", () => {
			vnode.attrs = {state: "active"};
			expect(step.getClassList(vnode)).to.contain("active");

			// TODO: test rest of the states
		});
	});

	describe("getDefaultAttrs", () => {
		let step;

		beforeEach(() => {
			step = new Step();
		});

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
});
