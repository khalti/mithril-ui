import {base}  from "./../../src/components/base.js";
import component from "mithril-componentx";
import chai from "chai";

let expect = chai.expect;

describe("base", () => {
	describe("validateAttrs", () => {
		let profile;
		beforeEach(() => {
			profile = component({
				base: base,
				attrSchema: {name: {presence: true}}
			});
		});

		it("throws errors if attributes are invalid", () => {
			expect(profile.view.bind(profile)).to.throw(Error);
		});

		it("does not throw errors if attributes are valid", () => {
			expect(profile.view.bind(profile, "ctrl", {name: "aName"})).not.to.throw(Error);
		});
	});

	describe("view", () => {
		let vdom ;
		beforeEach(() => {
			let attrs = {
				dom: {tagName: "i", "data-name": "aName"}
			};

			vdom = base.view("ctrl", attrs, "child1");
		});

		it("creates vdom with given tagName", () => {
			expect(vdom.tag).to.equal("i");
		});

		it("creates vdom with given attributes", () => {
			expect(vdom.attrs["data-name"]).to.equal("aName");
		});

		it("creates vdom with given children", () => {
			expect(vdom.children[0]).to.equal("child1");
		});
	});
});
