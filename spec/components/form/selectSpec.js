import {window, trigger, FRAME_BUDGET} from "./../../utils.js";
import {Select} from "../../../src/components/form/select.js";
import _ from 'mithril';
import {Field, ValidationError} from "powerform";
import {expect}  from "chai";

class TestField extends Field {
	validate(value, allValues) {
		if (!value) throw new ValidationError("This field is required.");
	}
}

describe("selection", () => {
  let attrs, vdom, model, superheroes;

  beforeEach(() => {
    superheroes = [{value: "", label: "Select superheroes"},
                   {value: 1, label: "Batman", icon: "aicon"},
                   {value: 2, label: "Superman", icon: "aicon"},
                   {value: 3, label: "flash", icon: "aicon"}];
    model = TestField.new();
    attrs = {
      label: "Superheroes",
      model: model,
      options: superheroes,
			name: "superhero"
    };

		_.mount(document.body, {
			view () {
				return _(Select, attrs);
			}
		});
  });

  it("lists options", () => {
		let firstOption = document.querySelector(".item");

    expect(firstOption.textContent).to.equal("Select superheroes");
  });

  it("shows errors", () => {
    attrs.model.isValid();
		let selectDom = document.querySelector("input");
		trigger("change", selectDom);

		setTimeout(() => {
			let errorDom = document.querySelectorAll(".error")[0];
			expect(errorDom.textContent).to.equal("This field is required.");
		}, FRAME_BUDGET);
  });

  it("gets red colored if error exists in its model", function () {
    attrs.model.isValid();

		setTimeout(() => {
			let rootDom = document.querySelector(".field.error");
			expect(rootDom).to.exist;
		});
  });

	it("adds name", () => {
		let selectDom = document.querySelector("input");
		expect(selectDom.name).to.equal("superhero");
	});
});
