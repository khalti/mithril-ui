import PasswordConfirmationField from "../../components/password-confirmation-field.js";
import TextField from "../../components/text-field.js";
import FormModel from "../../utils/form-model.js";
import m from "mithril";
import mock from "../deps/mock.js";

describe("components/password-confirmation-field", () => {
  let root, attrs, form;
  beforeEach(() => {
    let constrains = {
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

  it("sets input type to 'password'", () => {
    spyOn(m, 'component');

    PasswordConfirmationField.view(new PasswordConfirmationField.controller(attrs), attrs);

    let secondArg = m.component.calls.argsFor(0)[1];
    expect(secondArg.type).toEqual("password");
  });

  it("shows check mark if password is confirmed", () => {
    spyOn(m, 'component');
    form.password("apassword");
    form.confirmPassword("apassword");

    PasswordConfirmationField.view(new PasswordConfirmationField.controller(attrs), attrs);

    let secondArg = m.component.calls.argsFor(0)[1];
    expect(secondArg.append.tag).toEqual("i");
  });

  it("hides check mark if password is confirmed", () => {
    spyOn(m, 'component');
    form.password("apassword");
    form.confirmPassword("bpassword");

    PasswordConfirmationField.view(new PasswordConfirmationField.controller(attrs), attrs);

    let secondArg = m.component.calls.argsFor(0)[1];
    expect(secondArg.append).not.toBeDefined();
  });

  describe(".passwordMatches()", () => {
    it("returns true if model is dirty and error free", () => {
      form.password("apassword");
      form.confirmPassword("apassword");

      let dcontroller = new PasswordConfirmationField.controller(attrs);
      expect(dcontroller.passwordMatches()).toEqual(true);
    });

    it("returns false if model has error", () => {
      form.password("apassword");
      form.confirmPassword("bpassword");

      let dcontroller = new PasswordConfirmationField.controller(attrs);
      expect(dcontroller.passwordMatches()).toEqual(false);
    });
  });
});