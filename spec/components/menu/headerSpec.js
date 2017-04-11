import {window, getVnode} from "./../../utils.js";
import {MenuHeader} from "./../../../src/components/menu/header.js";
import {expect} from "chai";


describe("menuHeader", () => {
	describe("getClassList", () => {
		it("includes 'header'", () => {
			expect(new MenuHeader().getClassList(getVnode)).to.contain("header");
		});
	});
});
