import {window, getVnode} from "./../../utils.js";
import {menuHeader} from "./../../../src/components/menu/header.js";
import {expect} from "chai";


describe("menuHeader", () => {
	describe("getClassList", () => {
		it("includes 'header'", () => {
			expect(menuHeader.getClassList(getVnode)).to.contain("header");
		});
	});
});
