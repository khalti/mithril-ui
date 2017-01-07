import {window, presence, trigger, FRAME_BUDGET} from "./../../utils.js";
import {select} from "../../../src/components/form/select.js";
import _ from 'mithril';
import powerform from "powerform";
import {expect}  from "chai";


describe("selection", () => {
  let attrs, vdom, model, superheroes;

  beforeEach(() => {
    superheroes = [{value: "", label: "Select superheroes"},
                   {value: 1, label: "Batman", icon: "aicon"},
                   {value: 2, label: "Superman", icon: "aicon"},
                   {value: 3, label: "flash", icon: "aicon"}];
    model = powerform({superhero: {validator: presence}}).superhero;
    attrs = {
      label: "Superheroes",
      model: model,
      options: superheroes,
			name: "superhero"
    };

		_.mount(document.body, {
			view () {
				return _(select, attrs);
			}
		});
  });

  it("lists options", () => {
		let firstOption = document.querySelector("option");

    expect(firstOption.textContent).to.equal("Select superheroes");
  });

  it("shows errors", () => {
    attrs.model.isValid();
		let selectDom = document.querySelector("select");
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
		let selectDom = document.querySelector("select");
		expect(selectDom.name).to.equal("superhero");
	});
});
