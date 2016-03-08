var PasswordConfirmationField = require("../../components/password-confirmation-field.js")
var TextField = require("../../components/text-field.js")
var FormModel = require("../../utils/form-model.js")
var m = require("mithril")
var mock = require("../deps/mock.js")

describe("components/password-confirmation-field", function () {
  var root, attrs, form;
  beforeEach(function () {
    var constrains = {
      password: {presence: true},
      confirmPassword: {equality: "password"}
    };

    form = FormModel(constrains);
    attrs = {
      "model": form.confirmPassword,
      "passwordModel": form.password,
      "label": "Confirm Password",
      "event": 'onchange',
      "help": "A help."
    };
  });

  it("sets input type to 'password'", function () {
    spyOn(m, 'component');

    PasswordConfirmationField.view(new PasswordConfirmationField.controller(attrs), attrs);

    var secondArg = m.component.calls.argsFor(0)[1];
    expect(secondArg.type).toEqual("password");
  });

  it("shows check mark if password is confirmed", function () {
    spyOn(m, 'component');
    form.password("apassword");
    form.confirmPassword("apassword");

    PasswordConfirmationField.view(new PasswordConfirmationField.controller(attrs), attrs);

    var secondArg = m.component.calls.argsFor(0)[1];
    expect(secondArg.append.tag).toEqual("i");
  });

  it("hides check mark if password is confirmed", function () {
    spyOn(m, 'component');
    form.password("apassword");
    form.confirmPassword("bpassword");

    PasswordConfirmationField.view(new PasswordConfirmationField.controller(attrs), attrs);

    var secondArg = m.component.calls.argsFor(0)[1];
    expect(secondArg.append).not.toBeDefined();
  });

  describe(".passwordMatches()", function () {
    it("returns true if model is dirty and error free", function () {
      form.password("apassword");
      form.confirmPassword("apassword");

      var dcontroller = new PasswordConfirmationField.controller(attrs);
      expect(dcontroller.passwordMatches()).toEqual(true);
    });

    it("returns false if model has error", function () {
      form.password("apassword");
      form.confirmPassword("bpassword");

      var dcontroller = new PasswordConfirmationField.controller(attrs);
      expect(dcontroller.passwordMatches()).toEqual(false);
    });
  });
});