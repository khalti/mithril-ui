import {window, getVnode} from "./../../utils.js";
import {button} from "./../../../src/components/button/button.js";
import _ from "mithril";
import {expect} from "chai";
import {icon} from "./../../../src/components/icon/icon.js";
import {label} from "./../../../src/components/label.js";


describe("button", () => {
	let vnode;

	beforeEach(() => {
		vnode = getVnode();
	});

	it("complains if size is invalid.", () => {
		vnode.attrs = {size: "extra-large"};
		expect(button.oninit.bind(button, vnode)).to.throw(Error);
	});

	describe("getDefaultAttrs", () => {
		it("returns button as root.", () => {
			expect(button.getDefaultAttrs(vnode).root).to.equal("button");
		});

		it("sets type of root to attrs.type", () => {
			vnode.attrs = {type: "submit"};
			expect(button.getDefaultAttrs(vnode).rootAttrs.type).to.equal("submit");
		});
	});

	describe("getClassList", () => {
		it("returns list with 'ui' and 'button'.", () => {
			expect(button.getClassList(vnode)).to.contain("ui");
			expect(button.getClassList(vnode)).to.contain("button");
		});

		it("adds 'icon'.", () => {
			vnode.children = _(icon, {name: "caticon"});
			expect(button.getClassList(vnode)).to.contain("icon");
		});

		it("adds labeled.", () => {
			vnode.children = _(label, "a label");
			expect(button.getClassList(vnode)).to.contain("label");
		});

		it("adds basic.", () => {
			vnode.attrs = {basic: true};
			expect(button.getClassList(vnode)).to.contain("basic");
		});

		it("adds inverted.", () => {
			vnode.attrs = {inverted: true};
			expect(button.getClassList(vnode)).to.contain("inverted");
		});

		it("adds active.", () => {
			vnode.attrs = {active: true};
			expect(button.getClassList(vnode)).to.contain("active");
		});

		it("adds disabled.", () => {
			vnode.attrs = {disabled: true};
			expect(button.getClassList(vnode)).to.contain("disabled");
		});

		it("adds loading.", () => {
			vnode.attrs = {loading: true};
			expect(button.getClassList(vnode)).to.contain("loading");
		});

		it("adds size", () => {
			vnode.attrs = {size: "mini"};
			expect(button.getClassList(vnode)).to.contain("mini");
		});

		it("adds floats", () => {
			vnode.attrs = {float: "right"};
			expect(button.getClassList(vnode)).to.contain("right floated");

			vnode.attrs = {float: "left"};
			expect(button.getClassList(vnode)).to.contain("left floated");
		});

		it("adds color.", () => {
			vnode.attrs = {color: "red"};
			expect(button.getClassList(vnode)).to.contain("red");
		});

		it("adds compact.", () => {
			vnode.attrs = {compact: true};
			expect(button.getClassList(vnode)).to.contain("compact");
		});

		it("adds fluid.", () => {
			vnode.attrs = {fluid: true};
			expect(button.getClassList(vnode)).to.contain("fluid");
		});

		it("adds circular.", () => {
			vnode.attrs = {circular: true};
			expect(button.getClassList(vnode)).to.contain("circular");
		});

		it("adds emphasis.", () => {
			vnode.attrs = {emphasis: "primary"};
			expect(button.getClassList(vnode)).to.contain("primary");
		});
	});
});
