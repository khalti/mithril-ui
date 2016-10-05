import {card} from "./../../src/components/card.js";
import chai from "chai";

let expect = chai.expect;

describe("card", () => {
	it("creates vdom with 'ui card' class.", () => {
		let vdom = card.view(card.controller());
		expect(vdom.attrs.class).to.equal("ui card");
	});
});
