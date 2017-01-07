import {window, getVnode} from "./../../utils.js";
import {menuItem} from "./../../../src/components/menu/item.js";
import classnames from "classnames";
import {expect} from "chai";
import _ from "mithril";


describe("item", () => {
	let vnode;

	beforeEach(() => {
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
			expect(menuItem.getClassList({header: true})).to.contain("header");
		});

		it("includes proper 'color'.", () => {
			expect(menuItem.getClassList({color: "red"})).to.contain("red");
		});

		it("includes proper value for 'fitted'.", () => {
			expect(menuItem.getClassList({fitted: "vertically"})).to.contain("fitted vertically");
		});

		it("includes 'borderless'.", () => {
			expect(menuItem.getClassList({borderless: true})).to.contain("borderless");
		});

		it("includes 'active'.", () => {
			expect(menuItem.getClassList({active: true})).to.contain("active");
		});

		it("includes 'disabled'.", () => {
			expect(menuItem.getClassList({disabled: true})).to.contain("disabled");
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root to 'a' if 'href' is present", () => {
			vnode.attrs = {href: "/somewhere/"};
			expect(menuItem.getDefaultAttrs(vnode).root).to.equal('a');
		});

		it("sets root to 'div' if 'href' is absent.", () => {
			expect(menuItem.getDefaultAttrs(vnode).root).to.equal('div');
		});
	});
});
