import Field from "../../components/field.js";
import Input from "../../components/input.js";
import FormModel from "../../utils/form-model.js";
import m from "mithril";
import mock from "../deps/mock.js";

describe("components/field", () => {
  let attrs;
  let root;
  let aModel = FormModel({username: {presence: true}}).username;

  beforeEach(() => {
    root = mock.document.createElement("div");
    m.deps(mock.window);
    attrs = {
      class: 'aClass',
      model: aModel,
      input: {class: 'aClass'}
    };
  });

  it("sets the class of root div to attrs.class", () => {
    mock.requestAnimationFrame.$resolve();

    let aField = m.component(Field, attrs);
    m.mount(root, aField);

    expect(root.childNodes[0].class).toEqual(attrs.class);
    });

  it("prepends the attrs.label if it is a text", () => {
    mock.requestAnimationFrame.$resolve();

    attrs.label = 'Username';
    let aField = m.component(Field, attrs);
    m.mount(root, aField);

    let labelDOM = root.childNodes[0].childNodes[0];

    expect(labelDOM.nodeName).toEqual('LABEL');
    expect(labelDOM.childNodes[0].nodeValue).toEqual(attrs.label);
  });

  it("prepends the attrs.label.text if attrs.label.prepend is true", () => {
    mock.requestAnimationFrame.$resolve();

    attrs.label = {text: 'Username', prepend: true};
    let aField = m.component(Field, attrs);
    m.mount(root, aField);

    let labelDOM = root.childNodes[0].childNodes[0];

    expect(labelDOM.nodeName).toEqual('LABEL');
    expect(labelDOM.childNodes[0].nodeValue).toEqual(attrs.label.text);
  });

  it("appends the attrs.label.text if attrs.label.append is false", () => {
    mock.requestAnimationFrame.$resolve();

    attrs.label = {text: 'Username', append: true};
    let aField = m.component(Field, attrs);
    m.mount(root, aField);

    let labelDOM = root.childNodes[0].childNodes[2];

    expect(labelDOM.nodeName).toEqual('LABEL');
    expect(labelDOM.childNodes[0].nodeValue).toEqual(attrs.label.text);
  });

  it("prepends the attrs.label.text if attrs.label.prepend and attrs.label.append are not set", () => {
    mock.requestAnimationFrame.$resolve();

    attrs.label = {text: 'Username', append: true};
    let aField = m.component(Field, attrs);
    m.mount(root, aField);

    let labelDOM = root.childNodes[0].childNodes[2];

    expect(labelDOM.nodeName).toEqual('LABEL');
    expect(labelDOM.childNodes[0].nodeValue).toEqual(attrs.label.text);
  });

  it("passes attrs.input to Input component", () => {
    mock.requestAnimationFrame.$resolve();

    attrs.label = {text: 'Username', append: true};
    let aField = m.component(Field, attrs);
    m.mount(root, aField);

    let inputDOM = root.childNodes[0].childNodes[1];

    expect(inputDOM.class).toEqual(attrs.input.class);
  });

  it("appends the attrs.help", () => {
    mock.requestAnimationFrame.$resolve();

    attrs.help = 'Username';

    let aField = m.component(Field, attrs);
    m.mount(root, aField);

    let helpDOM = root.childNodes[0].childNodes[2];

    expect(helpDOM.childNodes[0].nodeValue).toEqual(attrs.help);
  });

  it("appends the error text", () => {
    mock.requestAnimationFrame.$resolve();

    attrs.model.errors = ['An error.'];
    let aField = m.component(Field, attrs);
    m.mount(root, aField);

    let errorDOM = root.childNodes[0].childNodes[2];

    expect(errorDOM.childNodes[0].nodeValue).toEqual(attrs.model.errors[0]);
  });

  it("removes the help text if there is an error", () => {
    mock.requestAnimationFrame.$resolve();

    attrs.help = "A help.";
    attrs.model.errors = ['An error.'];
    let aField = m.component(Field, attrs);
    m.mount(root, aField);

    let errorDOM = root.childNodes[0].childNodes[2];

    expect(errorDOM.childNodes[0].nodeValue).toEqual(attrs.model.errors[0]);
  });

  it("adds 'error' class to the root element if the model as an error", () => {
    mock.requestAnimationFrame.$resolve();

    attrs.help = "A help.";
    attrs.model.errors = ['An error.'];
    let aField = m.component(Field, attrs);
    m.mount(root, aField);

    expect(root.childNodes[0].class).toMatch('error');
  });
});
