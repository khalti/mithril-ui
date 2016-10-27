import {step} from "./../../../src/components/step/step.js";
import component from "mithril-componentx";
import classnames from "classnames";
import m from "mithril";
import {expect} from "chai";


describe("step", () => {
	it("complains if 'title' is absent.", () => {
		let aStep = m(step, {state: m.prop(0), index: 1});
		expect(aStep.view.bind(aStep, {})).to.throw(Error);
	});

	it("complains if 'state' is absent.", () => {
		let aStep = m(step, {title: "yo title", index: 1});
		expect(aStep.view.bind(aStep, {})).to.throw(Error);
	});

	it("complains if 'index' is absent.", () => {
		let aStep = m(step, {title: "yo title", state: m.prop(0)});
		expect(aStep.view.bind(aStep, {})).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'step'.", () => {
			let className = classnames(step.getClassList({}));
			expect(className).to.have.string("step");
		});

		it("includes state.", () => {
			let className = classnames(step.getClassList({state: 1, index: 1}));
			expect(className).to.have.string("active");

			// TODO: test rest of the states
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root to 'a'.", () => {
			let attrs = step.getDefaultAttrs({link: true});
			expect(attrs.root).to.equal("a");
		});

		it("sets root to 'div'.", () => {
			let attrs = step.getDefaultAttrs({link: false});
			expect(attrs.root).to.equal("div");
		})
	});

	describe("getState", () => {
		it("returns completed.", () => {
			expect(step.getState(2, 1)).to.equal("completed");
		});

		it("returns active.", () => {
			expect(step.getState(1, 1)).to.equal("active");
		});

		it("returns disabled.", () => {
			expect(step.getState(1, 2)).to.equal("disabled");
		});
	});

	describe("view", () => {
		it("wraps title and description in content if icon is present.", () => {
			let aStep = m(step, {
				icon: "a icon",
				title: "a title",
				description: "a description",
				state: 1,
				index: 1
			});
			let vdom = aStep.view(aStep.controller());

			let dIcon = vdom.children[0];
			expect(dIcon.tag).to.equal("a icon");

			let content = vdom.children[1];
			let contentVdom = content.view(content.controller());
			expect(contentVdom.attrs.class).to.equal("content");

			let title = contentVdom.children[0];
			let titleVdom = title.view(title.controller());
			expect(titleVdom.attrs.class).to.equal("title");

			let description = contentVdom.children[1];
			let descriptionVdom = description.view(description.controller());
			expect(descriptionVdom.attrs.class).to.equal("description");
		});

		it("won't wrap title and description in content if icon is absent.", () => {
			let aStep = m(step, {
				title: "a title",
				description: "a description",
				state: 1,
				index: 1
			});
			let vdom = aStep.view(aStep.controller());

			let title = vdom.children[0];
			let titleVdom = title.view(title.controller());
			expect(titleVdom.attrs.class).to.equal("title");

			let description = vdom.children[1];
			let descriptionVdom = description.view(description.controller());
			expect(descriptionVdom.attrs.class).to.equal("description");
		});

		it("sets root dom to 'a' if attrs.link is true.", () => {
			let aStep = m(step, {
				link: true,
				title: "a title",
				description: "a description",
				state: 1,
				index: 1
			});
			let vdom = aStep.view(aStep.controller());

			expect(vdom.tag).to.equal("a");
		});

		it("sets root dom to 'div' if attrs.link is falsey.", () => {
			let aStep = m(step, {
				title: "a title",
				description: "a description",
				state: 1,
				index: 1
			});
			let vdom = aStep.view(aStep.controller());

			expect(vdom.tag).to.equal("div");
		});
	});
});
