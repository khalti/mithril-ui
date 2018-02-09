import {window, getVnode} from "./../../utils.js";
import {MenuItem} from "./../../../src/components/menu/item.js";
import classnames from "classnames";
import {expect} from "chai";
import _ from "mithril";


describe("item", () => {
	let vnode, menuItem;

	beforeEach(() => {
		menuItem = new MenuItem();
		vnode = getVnode();
	});

	it("complains if color is invalid.", () => {
		vnode.attrs = {color: "transparent"};
		expect(menuItem.oninit.bind(menuItem, vnode)).to.throw(Error);
	});

	it("complains if 'fitted' is invalid.", () => {
		vnode.attrs = {fitted: "none"};
		expect(menuItem.oninit.bind(menuItem, vnode)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'item'", () => {
			expect(menuItem.getClassList(vnode)).to.contain("item");
		});

		it("includes 'header'", () => {
			vnode.attrs = {header: true};
			expect(menuItem.getClassList(vnode)).to.contain("header");
		});

		it("includes proper 'color'.", () => {
			vnode.attrs = {color: "red"};
			expect(menuItem.getClassList(vnode)).to.contain("red");
		});

		it("includes proper value for 'fitted'.", () => {
			vnode.attrs = {fitted: "vertically"};
			expect(menuItem.getClassList(vnode)).to.contain("fitted vertically");
		});

		it("includes 'borderless'.", () => {
			vnode.attrs = {borderless: true};
			expect(menuItem.getClassList(vnode)).to.contain("borderless");
		});

		it("includes 'active'.", () => {
			vnode.attrs = {active: true};
			expect(menuItem.getClassList(vnode)).to.contain("active");
		});

		it("includes 'disabled'.", () => {
			vnode.attrs = {disabled: true};
			expect(menuItem.getClassList(vnode)).to.contain("disabled");
		});
	});

	describe("getDefaultAttrs", () => {
		let menuItem;

		beforeEach(() => {
			menuItem = new MenuItem();
		});

		it("sets root to 'a' if 'href' is present", () => {
			vnode.attrs = {href: "/somewhere/"};
			expect(menuItem.getDefaultAttrs(vnode).root).to.equal('a');
		});

		it("sets root to 'div' if 'href' is absent.", () => {
			expect(menuItem.getDefaultAttrs(vnode).root).to.equal('div');
		});
	});
});
