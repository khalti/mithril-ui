import {checkbox} from "../../../src/components/form/checkbox.js";
import m from "mithril";
import powerform from "powerform";
import {getVdom, presence} from "./../../utils.js";
import chai from "chai";

let expect = chai.expect;

let truth = presence;

describe("checkbox", () => {
  let vdom, attrs;
  beforeEach(() => {
    attrs = {
      model: powerform({isTrue: {validator: truth, default: false}}).isTrue,
      label: 'A label.'
    };

    vdom = getVdom(m(checkbox, attrs));
  });

	it("complains if 'model' is absent.", () => {
		let aCheckbox = m(checkbox, {label: "A label"});
		expect(aCheckbox.view.bind(aCheckbox)).to.throw(Error);
	});

	it("complains if 'label' is absent.", () => {
		let aCheckbox = m(checkbox, {model: "A model"});
		expect(aCheckbox.view.bind(aCheckbox)).to.throw(Error);
	});

  it("sets class of <input> to 'ui checkbox'", () => {
    let input = vdom.children[0];

    expect(input.attrs.className).to.equal("ui checkbox");
  });

  it("sets input type to checkbox", () => {
    let input = vdom.children[0].children[0];
    expect(input.attrs.type).to.equal('checkbox');
  });

  it("creates <label> out of attrs.label", () => {
    let label = vdom.children[0].children[1];
    expect(label.children[0]).to.equal('A label.');
  });

  it("sets the value of input's checked to the model's value", () => {
		attrs.model(true);
		let vdom = getVdom(m(checkbox, attrs));
    let input = vdom.children[0].children[0];
    expect(input.attrs.checked).to.equal(true);
  });

  it("updates the value on click", () => {
    vdom.attrs.onclick({});
    expect(attrs.model()).to.equal(true);
  });

  it("its sets the class of input div to 'ui checkbox checked' if its checked", () => {
		attrs.model(true);
		let vdom = getVdom(m(checkbox, attrs));
    let input = vdom.children[0];
    expect(input.attrs.className).to.have.string('checked');
  });
});
