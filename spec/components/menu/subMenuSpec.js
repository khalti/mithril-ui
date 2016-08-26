import {subMenu} from "./../../../src/components/menu/subMenu.js";
import classnames from "classnames";
import {expect} from "chai";

describe("subMenu", () => {
	describe("getClassList", () => {
		it("includes 'menu'", () => {
			let className = classnames(subMenu.getClassList({}));
			expect(className).to.have.string("menu");
		});
	});
});
