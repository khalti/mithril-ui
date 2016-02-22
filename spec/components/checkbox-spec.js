"use strict";

import Checkbox from "../../components/checkbox.js";
import m from 'mithril';
import FormModel from '../../utils/form-model.js';
import mock from "../deps/mock.js";

describe("components/checkbox", () => {
  let aCheckbox, root, vdom;
  beforeEach(() => {
    root = mock.document.createElement("div");
    m.deps(mock.window);
    aCheckbox = m.component(Checkbox, {
      model: FormModel({username: {presence: true}}).username,
      label: 'A label.',
      event: 'onchange'});
  });

  it("sets class of root to .field", () => {
    m.mount(root, aCheckbox);

    expect(root.childNodes[0].class).toEqual('field');
  });

  it("sets class of <input> to .ui.checkbox", () => {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, aCheckbox);
    let inputDOM = root.childNodes[0].childNodes[1];

    expect(inputDOM.class).toEqual('ui checkbox');
  });

  it("sets input type to hidden", () => {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, aCheckbox);
    let inputDOM = root.childNodes[0].childNodes[1].childNodes[1];
    expect(inputDOM.getAttribute('type')).toEqual('hidden');
  });

  it("creates <label> out of attrs.label", () => {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, aCheckbox);
    let labelDOM = root.childNodes[0].childNodes[1].childNodes[2];
    expect(labelDOM.childNodes[0].nodeValue).toEqual('A label.');})
});
