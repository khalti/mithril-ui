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
      "label": "Password",
      "event": 'onchange',
      "help": "A help."
    };
  });

  it("sets input type to 'password'", function () {
    spyOn(m, 'component');

    PasswordField.view(new PasswordField.controller(attrs), attrs);

    var secondArg = m.component.calls.argsFor(0)[1];
    expect(secondArg.type).toEqual("password");
  });

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