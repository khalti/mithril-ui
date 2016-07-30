import {card} from "./../../src/components/card.js";
import chai from "chai";

let expect = chai.expect;

describe("card", () => {
	it("creates vdom with 'ui card' class.", () => {
		let vdom = card.view();
		expect(vdom.attrs.className).to.equal("ui card");
	});
});
