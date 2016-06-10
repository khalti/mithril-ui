var Field = require("../../components/field.js");
var Input = require("../../components/input.js");
var Form = require('mithril-form');
var m = require("mithril");
var mock = require("../deps/mock.js");

describe("components/field", function () {
  var attrs, root, aModel;

  beforeEach(function () {
    aModel = Form({username: {presence: true, default: "1"}}).username;
    root = mock.document.createElement("div");
    m.deps(mock.window);
    attrs = {
      model: aModel,
      placeholder: "Placeholder",
      help: "A help.",
      update: "onkeyup",
      validate: "onchange",
      input: {class: 'aClass'},
      type: 'text'
    };
  });

  it("sets the class of root div to 'field'", function () {
    mock.requestAnimationFrame.$resolve();

    var aField = m.component(Field, attrs);
    m.mount(root, aField);

    expect(root.childNodes[0].class).toEqual('field');
  });

  it("sets the class of root div to 'inline field' if .isInline set to true", function () {
    mock.requestAnimationFrame.$resolve();

    attrs.isInline = true;
    var aField = m.component(Field, attrs);
    m.mount(root, aField);

    expect(root.childNodes[0].class).toEqual('inline field');
  });

  it("prepends the attrs.label if it is a text", function () {
    mock.requestAnimationFrame.$resolve();

    attrs.label = 'Username';
    var aField = m.component(Field, attrs);
    m.mount(root, aField);

    var labelDOM = root.childNodes[0].childNodes[0];

    expect(labelDOM.nodeName).toEqual('LABEL');
    expect(labelDOM.childNodes[0].nodeValue).toEqual(attrs.label);
  });

  it("prepends the attrs.label.text if attrs.label.prepend is true", function () {
    mock.requestAnimationFrame.$resolve();

    attrs.label = {text: 'Username', prepend: true};
    var aField = m.component(Field, attrs);
    m.mount(root, aField);

    var labelDOM = root.childNodes[0].childNodes[0];

    expect(labelDOM.nodeName).toEqual('LABEL');
    expect(labelDOM.childNodes[0].nodeValue).toEqual(attrs.label.text);
  });

  it("appends the attrs.label.text if attrs.label.append is false", function () {
    mock.requestAnimationFrame.$resolve();

    attrs.label = {text: 'Username', append: true};
    var aField = m.component(Field, attrs);
    m.mount(root, aField);

    var labelDOM = root.childNodes[0].childNodes[2];

    expect(labelDOM.nodeName).toEqual('LABEL');
    expect(labelDOM.childNodes[0].nodeValue).toEqual(attrs.label.text);
  });

  it("prepends the attrs.label.text if attrs.label.prepend and attrs.label.append are not set", function () {
    mock.requestAnimationFrame.$resolve();

    attrs.label = {text: 'Username', append: true};
    var aField = m.component(Field, attrs);
    m.mount(root, aField);

    var labelDOM = root.childNodes[0].childNodes[2];

    expect(labelDOM.nodeName).toEqual('LABEL');
    expect(labelDOM.childNodes[0].nodeValue).toEqual(attrs.label.text);
  });

  it("passes attrs.input to Input component", function () {
    mock.requestAnimationFrame.$resolve();

    var aField = m.component(Field, attrs);
    m.mount(root, aField);

    var inputDOM = root.childNodes[0].childNodes[1];

    expect(inputDOM.class).toEqual(attrs.input.class);
  });

  it("appends the attrs.help", function () {
    mock.requestAnimationFrame.$resolve();

    attrs.help = 'Username';

    var aField = m.component(Field, attrs);
    m.mount(root, aField);

    var helpDOM = root.childNodes[0].childNodes[2];

    expect(helpDOM.childNodes[0].nodeValue).toEqual(attrs.help);
  });

  it("appends the error text", function () {
    mock.requestAnimationFrame.$resolve();

    attrs.model.errors(['An error.']);
    var aField = m.component(Field, attrs);
    m.mount(root, aField);

    var errorDOM = root.childNodes[0].childNodes[2];

    expect(errorDOM.childNodes[0].nodeValue).toEqual(attrs.model.errors()[0]);
  });

  it("wont show errors if .hideError is true", function () {
    mock.requestAnimationFrame.$resolve();

    attrs.hideError = true;
    attrs.model.errors(['An error.']);
    var aField = m.component(Field, attrs);
    m.mount(root, aField);

    var errorDOM = root.childNodes[0].childNodes[2];
    expect(errorDOM.nodeValue).toEqual("");
  });

  it("removes the help text if there is an error", function () {
    mock.requestAnimationFrame.$resolve();

    attrs.help = "A help.";
    attrs.model.errors(['An error.']);
    var aField = m.component(Field, attrs);
    m.mount(root, aField);

    var errorDOM = root.childNodes[0].childNodes[2];

    expect(errorDOM.childNodes[0].nodeValue).toEqual(attrs.model.errors()[0]);
  });

  it("adds 'error' class to the root element if the model as an error", function () {
    mock.requestAnimationFrame.$resolve();

    attrs.help = "A help.";
    attrs.model.errors(['An error.']);
    var aField = m.component(Field, attrs);
    m.mount(root, aField);

    expect(root.childNodes[0].class).toMatch('error');
  });

  it("binds model to value of input", function () {
    mock.requestAnimationFrame.$resolve();
    attrs.model("1");

    var aField = m.component(Field, attrs);
    m.mount(root, aField);

    var input = root.childNodes[0].childNodes[1].childNodes[1];

    expect(input.value).toEqual(attrs.model());
  });

  it("appends the help text.", function () {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, m.component(Field, attrs));
    var helpDOM = root.childNodes[0].childNodes[2];

    expect(helpDOM.childNodes[0].nodeValue).toEqual(attrs.help);
  });

  it("sets input's placeholder to attrs.placeholder", function () {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, m.component(Field, attrs));
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1];

    expect(inputDOM.getAttribute('placeholder')).toEqual(attrs.placeholder);
  });

  it("sets input's type to attrs.type", function () {
    mock.requestAnimationFrame.$resolve();

    attrs.type = "number";
    m.mount(root, m.component(Field, attrs));
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1];

    expect(inputDOM.getAttribute('type')).toEqual(attrs.type);
  });

  it("updates value on attrs.update", function () {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, m.component(Field, attrs));
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1];
    inputDOM.value = "earth";
    inputDOM[attrs.update]({});

    expect(attrs.model()).toEqual("earth");
  });

  it("validates on attrs.validate", function () {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, m.component(Field, attrs));
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1];
    attrs.model("");
    inputDOM[attrs.validate]({});
    expect(attrs.model.errors()).toBeDefined();
  });

  it("updates and validates the value if attrs.update and attrs.validate are same", function() {
    attrs.update = "onchange";
    mock.requestAnimationFrame.$resolve();

    m.mount(root, m.component(Field, attrs));
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1];
    // for valid data
    inputDOM.value = "earth";
    inputDOM[attrs.validate]({});
    expect(attrs.model()).toBeDefined("earth");
    expect(attrs.model.errors()).not.toBeDefined();
    // for invalid data
    inputDOM.value = "";
    inputDOM[attrs.validate]({});
    expect(attrs.model()).toBeDefined("");
    expect(attrs.model.errors()).toBeDefined();
  });

});
