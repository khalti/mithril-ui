import {select} from "../../../src/components/form/select.js";
import m from 'mithril';
import powerform from "powerform";
import {getVdom, presence} from "./../../utils.js";
import chai from "chai";

let expect = chai.expect;

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
		vdom = getVdom(m(select, attrs));
  });

  it("lists options", () => {
    let item1 = vdom.children[1].children[0];

    expect(item1.attrs.value).to.equal("");
    expect(item1.children[0]).to.equal("Select superheroes");
  });

  it("shows errors", () => {
    attrs.model.isValid();
		let vdom = getVdom(m(select, attrs));
    let error = vdom.children[2];

    expect(error.children[0]).to.equal("This field is required.");
  });

  it("gets red colored if error exists in its model", function () {
    attrs.model.isValid();
		let vdom = getVdom(m(select, attrs));

    expect(vdom.attrs.class).to.equal("field error");
  });

	it("adds name", () => {
		let selectDom = vdom.children[1];
		console.log(selectDom);
		expect(selectDom.attrs.name).to.equal("superhero");
	});
});
