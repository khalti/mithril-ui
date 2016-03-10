var PasswordField = require("../../components/password-field.js")
var TextField = require("../../components/text-field.js")
var FormModel = require("../../utils/form-model.js")
var m = require("mithril")
var mock = require("../deps/mock.js")

describe("components/password", function () {
  var root, attrs;
  beforeEach(function () {
    root = mock.document.createElement("div");
    m.deps(mock.window);
    attrs = {
      "model": FormModel({password: {presence: true}}).password,
      "label": "A label",
      "placeholder": "a placeholder",
      "update": 'onkeyup',
      "validate": 'onchange',
      "help": "A help."
    };
  });

  it("sets input type to 'password'", function () {
    spyOn(m, 'component');

    PasswordField.view(new PasswordField.controller(attrs), attrs);

    var secondArg = m.component.calls.argsFor(0)[1];
    expect(secondArg.type).toEqual("password");
  });

  it("sets input's placeholder to attrs.placeholder is present", function () {
    spyOn(m, 'component');

    PasswordField.view(new PasswordField.controller(attrs), attrs);

    var secondArg = m.component.calls.argsFor(0)[1];
    expect(secondArg.placeholder).toEqual(attrs.placeholder);
  });

  it("sets input's placeholder to '' is attrs.placeholder is undefined", function () {
    spyOn(m, 'component');

    attrs.placeholder = undefined
    PasswordField.view(new PasswordField.controller(attrs), attrs);

    var secondArg = m.component.calls.argsFor(0)[1];
    expect(secondArg.placeholder).toEqual("");
  });

  it("sets the value of input to attrs.model", function () {
    spyOn(m, 'component');

    attrs.model("a password")
    PasswordField.view(new PasswordField.controller(attrs), attrs);

    var secondArg = m.component.calls.argsFor(0)[1];
    expect(secondArg.value).toEqual("a password");
   });

  it("updates value on attrs.update", function () {
    mock.requestAnimationFrame.$resolve()

    m.mount(root, m.component(TextField, attrs))
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1]
    inputDOM.value = "earth"
    inputDOM[attrs.update]({})

    expect(attrs.model()).toEqual("earth")
  })

  it("validates on attrs.validate", function () {
    mock.requestAnimationFrame.$resolve()

    m.mount(root, m.component(TextField, attrs))
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1]
    attrs.model("")
    inputDOM[attrs.validate]({})
    expect(attrs.model.errors).toBeDefined()
  })

  it("updates and validates the value if attrs.update and attrs.validate are same", function() {
    attrs.update = "onchange"
    mock.requestAnimationFrame.$resolve()

    m.mount(root, m.component(TextField, attrs))
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1]
    // for valid data
    inputDOM.value = "earth"
    inputDOM[attrs.validate]({})
    expect(attrs.model()).toBeDefined("earth")
    expect(attrs.model.errors).not.toBeDefined()
    // for invalid data
    inputDOM.value = ""
    inputDOM[attrs.validate]({})
    expect(attrs.model()).toBeDefined("")
    expect(attrs.model.errors).toBeDefined()
  })

  describe(".getStrengthMeter()", function () {
    it("returns undefined if attrs.strengthChecker() is undefined", function () {
      var dController = new PasswordField.controller(attrs);
      expect(dController.getStrengthMeter()).not.toBeDefined();
    });


    it("returns undefined if attrs.strengthChecker() is undefined", function () {
      attrs.strengthChecker = function () {
        return 100;
      };

      var dController = new PasswordField.controller(attrs);
      expect(dController.getStrengthMeter()).not.toBeDefined();
    });

    it("sets proper strength width based upon return value of attrs.strengthChecker()", function () {
      attrs.strengthChecker = function () {
        return 100;
      };

      attrs.model("batword");
      var strengthDOM = new PasswordField.controller(attrs).getStrengthMeter();
      expect(strengthDOM.children[0].attrs.style.width).toEqual("100%");
    });
  });
});