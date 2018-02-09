import {window} from "./../utils.js";
import {expect} from "chai";
import {Dimmer} from "./../../src/components/dimmer.js";
import _ from "mithril";


describe("Dimmer", () => {
	describe("getClassList", () => {
		let vnode, dimmer;

		beforeEach(() => {
			dimmer = new Dimmer();
			vnode = {
				attrs: {},
				children: [],
				state: {}
			};
		});

		it("includes 'ui'", () => {
			let classList = dimmer.getClassList(vnode);
			expect(classList.join(" ")).to.contain("ui");
		});

		it("includes 'page'", () => {
			vnode.attrs.page = true;
			let classList = dimmer.getClassList(vnode);
			expect(classList.join(" ")).to.contain("page");
		});

		it("includes proper state", () => {
			vnode.attrs.state = "active";
			let classList = dimmer.getClassList(vnode);
			expect(classList.join(" ")).to.contain("active");

			vnode.attrs.state = "disabled";
			classList = dimmer.getClassList(vnode);
			expect(classList.join(" ")).to.contain("disabled");
		});

		it("includes 'inverted'", () => {
			vnode.attrs.inverted = true;
			let classList = dimmer.getClassList(vnode);
			expect(classList.join(" ")).to.contain("inverted");
		});

		it("includes 'dimmer'", () => {
			let classList = dimmer.getClassList(vnode);
			expect(classList.join(" ")).to.contain("dimmer");
		});
	});

	describe("view", () => {
		let vnode, vdom, dimmer;

		beforeEach(() => {
			dimmer = new Dimmer();
			vnode = {
				attrs: {
					rootAttrs: {id: "aDimmer"}
				},
				children: "aChild",
				state: {}
			};

			vdom = dimmer.view(vnode);
		});

		it("returns root div with proper attributes.", () => {
			expect(vdom.attrs.id).to.equal("aDimmer");
		});

		it("displays children.", () => {
			_.mount(document.body, {
				view () {
					return _(dimmer, "hello");
				}
			});

			let center = document.querySelector(".center");
			expect(center.textContent).to.equal("hello");
		});
	})
});
