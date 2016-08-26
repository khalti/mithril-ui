import {header} from "./../../../src/components/menu/header.js";
import classnames from "classnames";
import {expect} from "chai";


describe("header", () => {
	describe("getClassList", () => {
		it("includes 'header'", () => {
			let className = classnames(header.getClassList({}));
		});
	});
});
