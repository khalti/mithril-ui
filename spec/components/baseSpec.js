import {Base}  from "./../../src/components/base.js";
import {getVdom} from "./../utils.js";
import chai from "chai";
import {required} from "validatex";
import _ from "mithril";
import {mocks} from "mock-browser";

let expect = chai.expect;

describe("Base", () => {
	describe("validateAttrs", () => {
		let profile;

		before(() => {
			global.window = mocks.MockBrowser().createWindow();
			console.log("window:", global.window);
		});

		beforeEach(() => {
			class Profile extends Base {
				attrSchema = {name: required(true)}
			}

			profile = new Profile();
		});

		it("throws errors if attributes are invalid", () => {
			expect(profile.validateAttrs.bind(profile, {})).to.throw(Error);
		});

		it("does not throw errors if attributes are valid", () => {
			let attrs = {name: "aName"};
			expect(profile.validateAttrs.bind(profile, attrs)).not.to.throw(Error);
		});
	});

	describe.only("view", () => {
		let vdom;

		beforeEach(() => {
			let vnode = {
				attrs : {
					root: "i",
					id: "baseId"
				},
				children: ["child1"],
				state: {}
			};

			let base = new Base();

			vdom = base.view(vnode);
		});

		it("creates vdom with given attrs.root", () => {
			expect(vdom.tag).to.equal("i");
		});

		it("creates vdom with given attributes", () => {
			expect(vdom.attrs["id"]).to.equal("baseId");
		});

		it("creates vdom with given children", () => {
			expect(vdom.children[0]).to.equal("child1");
		});
	});
});
