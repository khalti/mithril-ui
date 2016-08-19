import {step} from "./../../src/components/step.js";
import component from "mithril-componentx";
import classnames from "classnames";
import m from "mithril";
import {expect} from "chai";


describe("step", () => {
	it("complains if title is absent.", () => {
		let aStep = m(step, {description: "yo description"});
		expect(aStep.view.bind(aStep, {})).to.throw(Error);
	});

	it("complains if description is absent.", () => {
		let aStep = m(step, {title: "yo title"});
		expect(aStep.view.bind(aStep, {})).to.throw(Error);
	});

	it("complains if state is invalid.", () => {
		let aStep = m(step, {title: "yo title", state: "invisible"});
		expect(aStep.view.bind(aStep, {})).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'step'.", () => {
			let className = classnames(step.getClassList({}));
			expect(className).to.have.string("step");
		});

		it("includes state.", () => {
			let className = classnames(step.getClassList({state: "active"}));
			expect(className).to.have.string("active");

			// TODO: test rest of the states
		});
	});

	describe("view", () => {
		it("wraps title and description in content if icon is present.", () => {
			let aStep = m(step, {icon: "a icon", title: "a title", description: "a description"});
			let vdom = aStep.view();

			let dIcon = vdom.children[0];
			expect(dIcon.tag).to.equal("a icon");

			let contentVdom = vdom.children[1].view();
			expect(contentVdom.attrs.className).to.equal("content");

			let titleVdom = contentVdom.children[0].view();
			expect(titleVdom.attrs.className).to.equal("title");

			let descriptionVdom = contentVdom.children[1].view();
			expect(descriptionVdom.attrs.className).to.equal("description");
		});

		it("won't wrap title and description in content if icon is absent.", () => {
			let aStep = m(step, {title: "a title", description: "a description"});
			let vdom = aStep.view();

			let titleVdom = vdom.children[0].view();
			expect(titleVdom.attrs.className).to.equal("title");

			let descriptionVdom = vdom.children[1].view();
			expect(descriptionVdom.attrs.className).to.equal("description");
		});

		it("sets root dom to 'a' if attrs.link is true.", () => {
			let aStep = m(step, {link: true, title: "a title", description: "a description"});
			let vdom = aStep.view();

			expect(vdom.tag).to.equal("a");
		});

		it("sets root dom to 'div' if attrs.link is falsey.", () => {
			let aStep = m(step, {title: "a title", description: "a description"});
			let vdom = aStep.view();

			expect(vdom.tag).to.equal("div");
		});
	});
});
