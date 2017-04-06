import {window, trigger} from "./../../utils.js";
import {checkbox} from "../../../src/components/form/checkbox.js";
import _ from "mithril";
import powerform from "powerform";
import {presence} from "./../../utils.js";
import chai from "chai";

let expect = chai.expect;

let truth = presence;

describe("checkbox", () => {
  let vnode;
  beforeEach(() => {
		vnode = {
			attrs : {
				model: powerform({isTrue: {validator: truth, default: false}}).isTrue,
				label: 'A label.'
			}
		}
  });

	it("complains if 'model' is absent.", () => {
		vnode.attrs.model = "";
		expect(checkbox.oninit.bind(checkbox, vnode)).to.throw(Error);
	});

	it("complains if 'label' is absent.", () => {
		vnode.attrs.label = "";
		expect(checkbox.oninit.bind(checkbox, vnode)).to.throw(Error);
	});

	describe("view", () => {
		it("sets class to 'ui checkbox'", () => {
			_.render(document.body, _(checkbox, vnode.attrs));
			let checkboxDom = document.querySelector(".checkbox");

			expect(checkboxDom.getAttribute("class")).to.equal("ui checkbox");
		});

		it("sets input type to checkbox", () => {
			_.render(document.body, _(checkbox, vnode.attrs));
			let inputDom = document.querySelector("input");

			expect(inputDom.getAttribute("type")).to.equal('checkbox');
		});

		it("sets the value of input's checked to the model's value", () => {
			vnode.attrs.model(true);

			_.render(document.body, _(checkbox, vnode.attrs));
			let inputDom = document.querySelector("input");

			expect(inputDom.checked).to.equal(true);
		});

		it("updates the value on click", () => {
			_.render(document.body, _(checkbox, vnode.attrs));
			let inputDom = document.querySelector("input");

			trigger("click", inputDom);

			expect(vnode.attrs.model()).to.equal(true);
		});

		it("its sets the class of input div to 'ui checkbox checked' if its checked", () => {
			vnode.attrs.model(true);

			_.render(document.body, _(checkbox, vnode.attrs));
			let checkboxDom = document.querySelector(".checkbox");

			expect(checkboxDom.getAttribute("class")).to.contain('checked');
		});

		it("creates <label> out of attrs.label", () => {
			_.render(document.body, _(checkbox, vnode.attrs));
			let labelDom = document.querySelector("label");

			expect(labelDom.textContent).to.equal('A label.');
		});
	});
});
