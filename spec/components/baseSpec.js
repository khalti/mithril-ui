import {base}  from "./../../src/components/base.js";
import {getVdom} from "./../utils.js";
import component from "mithril-componentx";
import chai from "chai";
import {required} from "validatex";
import m from "mithril";
import mq from "mithril-query";


let expect = chai.expect;

describe.only("base", () => {
	describe("validateAttrs", () => {
		let profile;
		beforeEach(() => {
			profile = component({
				base: base,
				attrSchema: {name: required(true)}
			});
		});

		it("throws errors if attributes are invalid", () => {
			expect(profile.view.bind(profile, new profile.controller())).to.throw(Error);
		});

		it("does not throw errors if attributes are valid", () => {
			let attrs = {name: "aName"};
			expect(profile.view.bind(profile, new profile.controller(attrs), attrs)).not.to.throw(Error);
		});
	});

	describe("view", () => {
		let vdom ;
		beforeEach(() => {
			let attrs = {
				root: "i",
				"data-name": "aName"
			};

			vdom = m(base , attrs, "child1").view();
		});

		it("creates vdom with given attrs.tag", () => {
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
