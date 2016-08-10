import {divider} from  "./../../src/components/divider.js";
import m from "mithril";
import {expect} from "chai";
import classnames from "classnames";


describe("divider", () => {
	it("complains on invalid type.", () => {
		let aDivider = m(divider, {type: "diagonal"});
		expect(aDivider.view.bind(aDivider)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'.", () => {
			let className = classnames(divider.getClassList({}));
			expect(className).to.have.string("ui");
		});

		it("includes 'divider'.", () => {
			let className = classnames(divider.getClassList({}));
			expect(className).to.have.string("divider");
		});

		it("includes type.", () => {
			var className = classnames(divider.getClassList({type: "vertical"}));
			expect(className).to.have.string("vertical");

			className = classnames(divider.getClassList({type: "horizontal"}));
			expect(className).to.have.string("horizontal");
		});

		it("includes 'inverted'.", () => {
			let className = classnames(divider.getClassList({inverted: true}));
			expect(className).to.have.string("inverted");
		});

		it("includes 'fitted'.", () => {
			let className = classnames(divider.getClassList({fitted: true}));
			expect(className).to.have.string("fitted");
		});

		it("includes 'hidden'.", () => {
			let className = classnames(divider.getClassList({hidden: true}));
			expect(className).to.have.string("hidden");
		});

		it("includes 'section'.", () => {
			let className = classnames(divider.getClassList({section: true}));
			expect(className).to.have.string("section");
		});

		it("includes 'clearing'.", () => {
			let className = classnames(divider.getClassList({clearing: true}));
			expect(className).to.have.string("clearing");
		});
	});

	describe("view", () => {
		it("renders children", () => {
			let aDivider = m(divider, 1, 2).view();
			console.log(aDivider);
			expect(aDivider.children[0]).to.equal(1);
			expect(aDivider.children[1]).to.equal(2);
		});
	});
});
