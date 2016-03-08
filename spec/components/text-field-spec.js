var TextField = require("../../components/text-field.js")
var m = require('mithril')
var FormModel = require('../../utils/form-model.js')
var mock = require("../deps/mock.js")

describe("components/text-field", function () {
  var root, attrs;

  beforeEach(function () {
    root = mock.document.createElement("div");
    m.deps(mock.window);
    attrs = {
      model: FormModel({username: {presence: true, default: ""}}).username,
      placeholder: "Placeholder",
      event: "onchange",
      help: "A help."
    }
  });

  it("sets class of root to .field", function () {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, m.component(TextField, attrs));

    expect(root.childNodes[0].class).toEqual('field');
  });

  it("sets class of <input> to .ui.input if attrs.append and attrs.prepend are not set", function () {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, m.component(TextField, attrs));
    var inputCOM = root.childNodes[0].childNodes[1];

    expect(inputCOM.class).toEqual('ui input');
  });

  it("sets class of <input> to 'ui labeled input' if attrs.prepend is set but attrs.append is not", function () {
    mock.requestAnimationFrame.$resolve();

    attrs.prepend = 'aPrepend';
    m.mount(root, m.component(TextField, attrs));
    var inputCOM = root.childNodes[0].childNodes[1];

    expect(inputCOM.class).toEqual('ui labeled input');
  });

  it("sets class of <input> to 'ui right labeled input' if attrs.append is set", function () {
    mock.requestAnimationFrame.$resolve();
    attrs.append = 'aAppend';

    m.mount(root, m.component(TextField, attrs));
    var inputCOM = root.childNodes[0].childNodes[1];

    expect(inputCOM.class).toEqual('ui right labeled input');
  });

  it("appends the help text.", function () {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, m.component(TextField, attrs));
    var helpDOM = root.childNodes[0].childNodes[2];

    expect(helpDOM.childNodes[0].nodeValue).toEqual(attrs.help);
  });

  it("sets attrs.placeholder to input's placeholder", function () {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, m.component(TextField, attrs));
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1];

    expect(inputDOM.getAttribute('placeholder')).toEqual(attrs.placeholder);
  });

  it("sets input's type to text if no attrs.type is passed", function () {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, m.component(TextField, attrs));
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1];

    expect(inputDOM.getAttribute('type')).toEqual("text");
  });

  it("sets input's type to attrs.type", function () {
    mock.requestAnimationFrame.$resolve();

    attrs.type = "number";
    m.mount(root, m.component(TextField, attrs));
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1];

    expect(inputDOM.getAttribute('type')).toEqual(attrs.type);
  });
});
