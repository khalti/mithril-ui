import {expect} from "chai";
import {dimmer} from "./../../src/components/dimmer.js";


describe("dimmer", () => {
	it("complains if 'page' has inapproriate value.");
	it("complains if 'state' has inapproriate value.");
	it("complains if 'inverted' has inapproriate value.");

	describe("getClassList", () => {
		it("includes 'ui'");
		it("includes 'page'");
		it("includes 'active'");
		it("includes 'disabled'");
		it("includes 'inverted'");
		it("includes 'dimmer'");
	});

	describe("view", () => {
		it("returns root div with proper attributes.");
		it("displays children.");
	})
});
