import {window, getVnode} from "./../../utils.js";
import {subMenu} from "./../../../src/components/menu/subMenu.js";
import classnames from "classnames";
import {expect} from "chai";

describe("subMenu", () => {
	let vnode;

	beforeEach(() => {
		vnode = getVnode();
	});

	describe("getClassList", () => {
		it("includes 'menu'", () => {
			expect(subMenu.getClassList(vnode)).to.contain("menu");
		});

		it("includes 'right'", () => {
			vnode.attrs.right = true;
			expect(subMenu.getClassList(vnode)).to.contain("right");
		});
	});
});
