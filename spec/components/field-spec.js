import Field from "../../components/field.js";
import FormModel from "../../utils/form-model.js";
import m from "mithril";

describe("components/field", () => {
  let attrs;
  let aModel = FormModel({username: {presence: true}}).username;
  beforeEach(() => {
    attrs = {
      class: 'aClass',
      model: aModel,
      input: m('input', {})};});

  it("sets the class of root div to attrs.class", () => {
    let aField = Field.view(new Field.controller(attrs), attrs);
    expect(aField.attrs.class).toEqual(attrs.class);});

  it("prepends the attrs.label if it is a text", () => {
    attrs.label = 'Username';
    let aField = Field.view(new Field.controller(attrs), attrs);

    expect(aField.children[0].tag).toEqual('label');
    expect(aField.children[0].children[0]).toEqual(attrs.label);});

  it("prepends the attrs.label.text if attrs.label.prepend is true", () => {
    attrs.label = {text: 'Username', prepend: true};
    let aField = Field.view(new Field.controller(attrs), attrs);

    expect(aField.children[0].tag).toEqual('label');
    expect(aField.children[0].children[0]).toEqual(attrs.label.text);});

  it("appends the attrs.label.text if attrs.label.append is false", () => {
    attrs.label = {text: 'Username', append: true};
    let aField = Field.view(new Field.controller(attrs), attrs);

    expect(aField.children[2].tag).toEqual('label');
    expect(aField.children[2].children[0]).toEqual(attrs.label.text);});

  it("prepends the attrs.label.text if attrs.label.prepend and attrs.label.append are not set", () => {
    attrs.label = {text: 'Username'};
    let aField = Field.view(new Field.controller(attrs), attrs);

    expect(aField.children[0].tag).toEqual('label');
    expect(aField.children[0].children[0]).toEqual(attrs.label.text);});

  it("attaches attrs.input component as its children", () => {
    let aField = Field.view(new Field.controller(attrs), attrs);

    expect(aField.children[1].tag).toEqual('input');});

  it("attaches attrs.model to attrs.input.model", () => {
    let aField = Field.view(new Field.controller(attrs), attrs);

    expect(aField.children[1].attrs.model).toEqual(attrs.model);});

  it("appends the attrs.help", () => {
    attrs.help = 'Username';
    let aField = Field.view(new Field.controller(attrs), attrs);

    expect(aField.children[2].children[0]).toEqual(attrs.help);});

  it("appends the error text", () => {
    attrs.model.errors = ['An error.'];
    let aField = Field.view(new Field.controller(attrs), attrs);

    expect(aField.children[2].children[0]).toEqual(attrs.model.errors[0]);});

  it("removes the help text if there is an error", () => {
    attrs.help = "A help.";
    attrs.model.errors = ['An error.'];
    let aField = Field.view(new Field.controller(attrs), attrs);

    expect(aField.children[2].children[0]).toEqual(attrs.model.errors[0]);});

  it("adds 'error' class to the root element if the model as an error", () => {
    attrs.help = "A help.";
    attrs.model.errors = ['An error.'];
    let aField = Field.view(new Field.controller(attrs), attrs);

    expect(aField.attrs.class).toMatch('error');});});