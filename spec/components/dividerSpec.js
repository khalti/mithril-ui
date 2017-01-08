import {window, getVnode} from "./../utils.js";
import {divider} from  "./../../src/components/divider.js";
import _ from "mithril";
import {expect} from "chai";


describe("divider", () => {
	let vnode;

	beforeEach(() => {
		vnode = getVnode();
	});

	it("complains on invalid type.", () => {
		vnode.attrs = {type: "diagonal"};
		expect(divider.oninit.bind(vnode)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'.", () => {
			expect(divider.getClassList(vnode)).to.contain("ui");
		});

		it("includes 'divider'.", () => {
			expect(divider.getClassList(vnode)).to.contain("divider");
		});

		it("includes type.", () => {
			vnode.attrs = {type: "vertical"};
			expect(divider.getClassList(vnode)).to.contain("vertical");

			vnode.attrs = {type: "horizontal"};
			expect(divider.getClassList(vnode)).to.contain("horizontal");
		});

		it("includes 'inverted'.", () => {
			vnode.attrs = {inverted: true};
			expect(divider.getClassList(vnode)).to.contain("inverted");
		});

		it("includes 'fitted'.", () => {
			vnode.attrs = {fitted: true};
			expect(divider.getClassList(vnode)).to.contain("fitted");
		});

		it("includes 'hidden'.", () => {
			vnode.attrs = {hidden: true};
			expect(divider.getClassList(vnode)).to.contain("hidden");
		});

		it("includes 'section'.", () => {
			vnode.attrs = {section: true};
			expect(divider.getClassList(vnode)).to.contain("section");
		});

		it("includes 'clearing'.", () => {
			vnode.attrs = {clearing: true};
			expect(divider.getClassList(vnode)).to.contain("clearing");
		});
	});
});
