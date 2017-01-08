import {window, getVnode} from "./../../utils.js";
import {buttons} from "./../../../src/components/button/buttons.js";
import _ from "mithril";
import {expect} from "chai";


describe("buttons", () => {
	let vnode;

	beforeEach(() => {
		vnode = getVnode();
	});

	it("complains on invalid button count", () => {
		vnode.attrs = {buttonCount: 0};
		expect(buttons.oninit.bind(buttons, vnode)).to.throw(Error);
	});

	it("complains on invalid color", () => {
		vnode.attrs = {color: "transparent duh"};
		expect(buttons.oninit.bind(buttons, vnode)).to.throw(Error);
	});

	it("complains on invalid size", () => {
		vnode.attrs = {color: "extra huge"};
		expect(buttons.oninit.bind(buttons, vnode)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'", () => {
			expect(buttons.getClassList(vnode)).to.contain("ui");
		});

		it("includes 'buttons'", () => {
			expect(buttons.getClassList(vnode)).to.contain("buttons");
		});

		it("includes 'icon'", () => {
			vnode.attrs = {icon: true};
			expect(buttons.getClassList(vnode)).to.contain("icon");
		});

		it("includes 'vertical'", () => {
			vnode.attrs = {vertical: true};
			expect(buttons.getClassList(vnode)).to.contain("vertical");
		});

		it("includes 'labeled'", () => {
			vnode.attrs = {vertical: true};
			expect(buttons.getClassList(vnode)).to.contain("vertical");
		});

		it("includes proper button count", () => {
			vnode.attrs = {buttonCount: 1};
			expect(buttons.getClassList(vnode)).to.contain("one");
		});

		it("includes proper button color", () => {
			vnode.attrs = {color: "red"};
			expect(buttons.getClassList(vnode)).to.contain("red");
		});

		it("includes 'basic'", () => {
			vnode.attrs = {basic: true};
			expect(buttons.getClassList(vnode)).to.contain("basic");
		});

		it("includes proper button size", () => {
			vnode.attrs = {size: "big"};
			expect(buttons.getClassList(vnode)).to.contain("big");
		});
	});
});
