"use strict";

import Checkbox from "../../components/checkbox.js";
import m from 'mithril';
import FormModel from '../../utils/form-model.js';
import mock from "../deps/mock.js";
import _ from "lodash";

describe("components/checkbox", () => {
  let aCheckbox, root, vdom, attrs;
  beforeEach(() => {
    root = mock.document.createElement("div");
    m.deps(mock.window);
    attrs = {
      model: FormModel({isTrue: {exclusion: {within: [true]}, default: true}}).isTrue,
      label: 'A label.'
    }

    aCheckbox = m.component(Checkbox, attrs);
  });

  it("sets class of root to .field", () => {
    m.mount(root, aCheckbox);

    expect(root.childNodes[0].class).toEqual('field');
  });

  it("sets class of <input> to .ui.checkbox", () => {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, aCheckbox);
    let inputDOM = root.childNodes[0].childNodes[1];

    expect(inputDOM.class).toMatch('ui checkbox');
  });

  it("sets input type to checkbox", () => {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, aCheckbox);
    let inputDOM = root.childNodes[0].childNodes[1].childNodes[1];
    expect(inputDOM.getAttribute('type')).toEqual('checkbox');
  });

  it("creates <label> out of attrs.label", () => {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, aCheckbox);
    let labelDOM = root.childNodes[0].childNodes[1].childNodes[2];
    expect(labelDOM.childNodes[0].nodeValue).toEqual('A label.');})

  it("sets the value of input's checked to the model's value", () => {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, aCheckbox);
    let inputDOM = root.childNodes[0].childNodes[1].childNodes[1];
    expect(inputDOM.getAttribute('checked')).toEqual('true');
  });
});
