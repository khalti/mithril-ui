import {window, trigger} from "./../../utils.js";
import {Checkbox} from "../../../src/components/form/checkbox.js";
import _ from "mithril";
import {Field, Form, ValidationError} from "powerform";
import chai from "chai";

let expect = chai.expect;

class TestField extends Field {
	validate(value, allValues) {
		if (!value) throw new ValidationError("This field is required.");
	}
}

describe("checkbox", () => {
  let vnode;
  beforeEach(() => {
		vnode = {
			attrs : {
				model: TestField.new({default: false}),
				label: 'A label.',
				value: true
			}
		}
  });

	it("complains if 'model' is absent.", () => {
		vnode.attrs.model = "";
		let checkbox = new Checkbox();
		expect(checkbox.oninit.bind(checkbox, vnode)).to.throw(Error);
	});

	it("complains if 'label' is absent.", () => {
		vnode.attrs.label = "";
		let checkbox = new Checkbox();
		expect(checkbox.oninit.bind(checkbox, vnode)).to.throw(Error);
	});

	it("complains if 'value' is absent.", () => {
		vnode.attrs.value = "";
		let checkbox = new Checkbox();
		expect(checkbox.oninit.bind(checkbox, vnode)).to.throw(Error);
	});

	describe("view", () => {
		it("sets class to 'ui checkbox'", () => {
			_.render(document.body, _(Checkbox, vnode.attrs));
			let checkboxDom = document.querySelector(".checkbox");

			expect(checkboxDom.getAttribute("class")).to.equal("ui checkbox");
		});

		it("sets input type to checkbox", () => {
			_.render(document.body, _(Checkbox, vnode.attrs));
			let inputDom = document.querySelector("input");

			expect(inputDom.getAttribute("type")).to.equal('checkbox');
		});

		it("sets the value of input's checked to the model's value", () => {
			vnode.attrs.model.setData(true);

			_.render(document.body, _(Checkbox, vnode.attrs));
			let inputDom = document.querySelector("input");

			expect(inputDom.checked).to.equal(true);
		});

		it("updates the value on click", () => {
			_.render(document.body, _(Checkbox, vnode.attrs));
			let inputDom = document.querySelector("input");

			trigger("click", inputDom);

			expect(vnode.attrs.model.getData()).to.equal(true);
		});

		it("its sets the class of input div to 'ui checkbox checked' if its checked", () => {
			vnode.attrs.model.setData(true);

			_.render(document.body, _(Checkbox, vnode.attrs));
			let checkboxDom = document.querySelector(".checkbox");

			expect(checkboxDom.getAttribute("class")).to.contain('checked');
		});

		it("creates <label> out of attrs.label", () => {
			_.render(document.body, _(Checkbox, vnode.attrs));
			let labelDom = document.querySelector("label");

			expect(labelDom.textContent).to.equal('A label.');
		});

		describe("multiple values with default", () => {
			let listVnode;
		  beforeEach(() => {
				listVnode = {
					attrs : {
						model: TestField.new({default: ["apple"]}),
						label: 'A label.',
						value: "ball",
						multiple: true
					}
				}
		  });
			it("model value should be list type if multiple is true", () => {
				listVnode.attrs.model.setData("apple");
				let checkbox = new Checkbox();
				expect(checkbox.oninit.bind(checkbox, listVnode)).to.throw(Error);
			});

			it("value if not present in model should be pushed on click", () => {
				_.render(document.body, _(Checkbox, listVnode.attrs));
				let inputDom = document.querySelector("input");
				trigger("click", inputDom);
				let val = listVnode.attrs.model.getData();
				expect(val[val.length - 1]).to.equal("ball");
			});

			it("value if present in model should be popped on click", () => {
				listVnode.attrs.model.setData(["apple", "ball"]);
				_.render(document.body, _(Checkbox, listVnode.attrs));
				let inputDom = document.querySelector("input");
				trigger("click", inputDom);
				let val = listVnode.attrs.model.getData();
				expect(val[val.length - 1]).to.equal("apple");
			});

			it("checked if value present in model", () => {
				listVnode.attrs.model.setData(["apple", "ball"]);
				_.render(document.body, _(Checkbox, listVnode.attrs));
				let checkboxDom = document.querySelector(".checkbox");

				expect(checkboxDom.getAttribute("class")).to.contain('checked');
			});

			it("checked empty if value not present in model", () => {
				listVnode.attrs.model.setData(["apple"]);
				_.render(document.body, _(Checkbox, listVnode.attrs));
				let checkboxDom = document.querySelector(".checkbox");

				expect(checkboxDom.getAttribute("class")).to.not.contain('checked');
			});
		});

		describe("multiple values without default", () => {
			let listVnode;
		  beforeEach(() => {
				listVnode = {
					attrs : {
						model: TestField.new(),
						label: 'A label.',
						value: "apple",
						multiple: true
					}
				}
		  });
			it("model value should be list type if multiple is true", () => {
				listVnode.attrs.model.setData("apple");
				let checkbox = new Checkbox();
				expect(checkbox.oninit.bind(checkbox, listVnode)).to.throw(Error);
			});

			it("value if not present in model should be pushed on click", () => {
				_.render(document.body, _(Checkbox, listVnode.attrs));
				let inputDom = document.querySelector("input");
				trigger("click", inputDom);
				let val = listVnode.attrs.model.getData();
				expect(val[val.length - 1]).to.equal("apple");
			});

			it("value if present in model should be popped on click", () => {
				listVnode.attrs.model.setData(["apple"]);
				_.render(document.body, _(Checkbox, listVnode.attrs));
				let inputDom = document.querySelector("input");
				trigger("click", inputDom);
				let val = listVnode.attrs.model.getData();
				expect(val.length).to.equal(0);
			});

			it("checked if value present in model", () => {
				listVnode.attrs.model.setData(["apple", "ball"]);
				_.render(document.body, _(Checkbox, listVnode.attrs));
				let checkboxDom = document.querySelector(".checkbox");

				expect(checkboxDom.getAttribute("class")).to.contain('checked');
			});

			it("checked empty if value not present in model", () => {
				listVnode.attrs.model.getData();
				_.render(document.body, _(Checkbox, listVnode.attrs));
				let checkboxDom = document.querySelector(".checkbox");

				expect(checkboxDom.getAttribute("class")).to.not.contain('checked');
			});

		});
	});
});
