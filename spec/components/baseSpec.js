import {window, FRAME_BUDGET} from "./../utils.js";
import {UI}  from "./../../src/components/base.js";
import {expect} from "chai";
import {required} from "validatex";
import _ from "mithril";


describe("UI", () => {
	describe("validateAttrs", () => {
		let profile;

		beforeEach(() => {
			class Profile extends UI {
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

	describe("view", () => {
		let buttonDom, document;

		beforeEach(() => {
			document = window.document;

			class Button extends UI {
				content = "a button content"

				getDefaultAttrs(vnode) {
					let attrs =  super.getDefaultAttrs(vnode);
					attrs.id = "buttonId";
					return attrs;
				}

				view ({attrs, children, state}) {
					return _("button", attrs.rootAttrs, this.content);
				}
			}

			_.mount(document.body, Button);

			buttonDom = document.querySelector("button");
		});

		it("creates vdom with given attrs.root", () => {
			expect(buttonDom.nodeName).to.equal("BUTTON");
		});

		it("creates vdom with given attributes", () => {
			expect(buttonDom.getAttribute("id")).to.equal("buttonId");
		});

		it("creates vdom with given children", () => {
			expect(buttonDom.textContent).to.equal("a button content");
		});
	});
});
