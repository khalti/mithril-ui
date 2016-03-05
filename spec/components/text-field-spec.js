"use strict";

import TextField from "../../components/text-field.js";
import m from 'mithril';
import FormModel from '../../utils/form-model.js';
import mock from "../deps/mock.js";

describe("components/text-field", () => {
  let root, attrs;

  beforeEach(() => {
    root = mock.document.createElement("div");
    m.deps(mock.window);
    attrs = {
      model: FormModel({username: {presence: true, default: ""}}).username,
      placeholder: "Placeholder",
      event: "onchange",
      help: "A help."
    }
  });

  it("sets class of root to .field", () => {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, m.component(TextField, attrs));

    expect(root.childNodes[0].class).toEqual('field');
  });

  it("sets class of <input> to .ui.input if attrs.append and attrs.prepend are not set", () => {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, m.component(TextField, attrs));
    let inputCOM = root.childNodes[0].childNodes[1];

    expect(inputCOM.class).toEqual('ui input');
  });

  it("sets class of <input> to 'ui labeled input' if attrs.prepend is set but attrs.append is not", () => {
    mock.requestAnimationFrame.$resolve();

    attrs.prepend = 'aPrepend';
    m.mount(root, m.component(TextField, attrs));
    let inputCOM = root.childNodes[0].childNodes[1];

    expect(inputCOM.class).toEqual('ui labeled input');
  });

  it("sets class of <input> to 'ui right labeled input' if attrs.append is set", () => {
    mock.requestAnimationFrame.$resolve();
    attrs.append = 'aAppend';

    m.mount(root, m.component(TextField, attrs));
    let inputCOM = root.childNodes[0].childNodes[1];

    expect(inputCOM.class).toEqual('ui right labeled input');
  });

  it("appends the help text.", () => {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, m.component(TextField, attrs));
    let helpDOM = root.childNodes[0].childNodes[2];

    expect(helpDOM.childNodes[0].nodeValue).toEqual(attrs.help);
  });

  it("sets attrs.placeholder to input's placeholder", () => {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, m.component(TextField, attrs));
    let inputDOM = root.childNodes[0].childNodes[1].childNodes[1];

    expect(inputDOM.getAttribute('placeholder')).toEqual(attrs.placeholder);
  });

  it("sets input's type to text if no attrs.type is passed", () => {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, m.component(TextField, attrs));
    let inputDOM = root.childNodes[0].childNodes[1].childNodes[1];

    expect(inputDOM.getAttribute('type')).toEqual("text");
  });

  it("sets input's type to attrs.type", () => {
    mock.requestAnimationFrame.$resolve();

    attrs.type = "number";
    m.mount(root, m.component(TextField, attrs));
    let inputDOM = root.childNodes[0].childNodes[1].childNodes[1];

    expect(inputDOM.getAttribute('type')).toEqual(attrs.type);
  });
});
