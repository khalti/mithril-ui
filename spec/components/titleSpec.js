import {title} from "./../../src/components/title.js";
import {expect} from "chai";
import classnames from "classnames";


describe("title", () => {
	describe("getClassList", () => {
		it("includes 'title'.", () => {
			let className = classnames(title.getClassList({}));
			expect(className).to.have.string("title");
		});
	});
});
