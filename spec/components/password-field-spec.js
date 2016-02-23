import PasswordField from "../../components/password-field.js";
import TextField from "../../components/text-field.js";
import FormModel from "../../utils/form-model.js";
import m from "mithril";
import mock from "../deps/mock.js";

describe("components/password", () => {
  let root, attrs;
  beforeEach(() => {
    root = mock.document.createElement("div");
    m.deps(mock.window);
    attrs = {
      "model": FormModel({password: {presence: true}}).password,
      "label": "Password",
      "event": 'onchange',
      "help": "A help."
    };
  });

  it("sets input type to 'password'", () => {
    spyOn(m, 'component');

    PasswordField.view(new PasswordField.controller(attrs), attrs);

    let secondArg = m.component.calls.argsFor(0)[1];
    expect(secondArg.type).toEqual("password");
  });

  describe(".getStrengthMeter()", () => {
    it("returns undefined if attrs.strengthChecker() is undefined", () => {
      let dController = new PasswordField.controller(attrs);
      expect(dController.getStrengthMeter()).not.toBeDefined();
    });


    it("returns undefined if attrs.strengthChecker() is undefined", () => {
      attrs.strengthChecker = function () {
        return 100;
      };

      let dController = new PasswordField.controller(attrs);
      expect(dController.getStrengthMeter()).not.toBeDefined();
    });

    it("sets proper strength width based upon return value of attrs.strengthChecker()", () => {
      attrs.strengthChecker = function () {
        return 100;
      };

      attrs.model("batword");
      let strengthDOM = new PasswordField.controller(attrs).getStrengthMeter();
      expect(strengthDOM.children[0].attrs.style.width).toEqual("100%");
    });
  });
});