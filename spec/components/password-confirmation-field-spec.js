var PasswordConfirmationField = require("../../components/password-confirmation-field.js")
var TextField = require("../../components/text-field.js")
var FormModel = require("../../utils/form-model.js")
var m = require("mithril")
var mock = require("../deps/mock.js")

describe("components/password-confirmation-field", function () {
  var root, attrs, form;
  beforeEach(function () {
    root = mock.document.createElement("div");
    m.deps(mock.window);

    var constrains = {
      password: {presence: true, default: ""},
      confirmPassword: {equality: "password", default: ""}
    };

    form = FormModel(constrains);
    attrs = {
      "model": form.confirmPassword,
      "passwordModel": form.password,
      "label": "Confirm Password",
      "placeholder": "A placeholder",
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

  it("sets input's placeholder to attrs.placeholder is present", function () {
    spyOn(m, 'component');

    PasswordConfirmationField.view(new PasswordConfirmationField.controller(attrs), attrs);

    var secondArg = m.component.calls.argsFor(0)[1];
    expect(secondArg.placeholder).toEqual(attrs.placeholder);
  });

  it("sets input's placeholder to '' is attrs.placeholder is undefined", function () {
    spyOn(m, 'component');

    attrs.placeholder = undefined
    PasswordConfirmationField.view(new PasswordConfirmationField.controller(attrs), attrs);

    var secondArg = m.component.calls.argsFor(0)[1];
    expect(secondArg.placeholder).toEqual("");
  });

  // it("sets the value of input to attrs.model", function () {
  //   spyOn(m, 'component');

  //   attrs.model("a password")
  //   PasswordConfirmationField.view(new PasswordConfirmationField.controller(attrs), attrs);

  //   var secondArg = m.component.calls.argsFor(0)[1];
  //   expect(secondArg.value).toEqual("a password");
  //  });

  it("updates the model if attrs.event is triggered", function () {
    mock.requestAnimationFrame.$resolve();

    m.mount(root, {
      view: function () {
        return m.component(PasswordConfirmationField, attrs)}})
    var target = root.childNodes[0].childNodes[1].childNodes[1]

    target.value = "yo password"
    target[attrs.event]({})

    mock.requestAnimationFrame.$resolve()
    expect(attrs.model()).toEqual("yo password")
   });

  it("shows check mark if password is confirmed", function () {
    mock.requestAnimationFrame.$resolve();

    form.password("apassword")

    m.mount(root, {
      view: function () {
        return m.component(PasswordConfirmationField, attrs)}})

    var input = root.childNodes[0].childNodes[1].childNodes[1]
    input.value = form.password()
    input.onkeyup({})
    m.redraw(true)

    var append = root.childNodes[0].childNodes[1].childNodes[2]
    expect(append.nodeName).toEqual("I")
  });

  it("hides check mark if password is not confirmed", function () {
    mock.requestAnimationFrame.$resolve();
    form.password("apassword")

    m.mount(root, {
      view: function () {
        return m.component(PasswordConfirmationField, attrs)}})

    var input = root.childNodes[0].childNodes[1].childNodes[1]
    input.value = "bpassword"
    input.onkeyup({})
    m.redraw(true)

    var append = root.childNodes[0].childNodes[1].childNodes[2]
    expect(append.nodeValue).toEqual("")
  });

  describe(".setPasswordMatches()", function () {
    it("returns true if model is dirty and error free", function () {
      form.password("apassword");

      var dcontroller = new PasswordConfirmationField.controller(attrs);
      dcontroller.setPasswordMatches(form.password())
      expect(dcontroller.passwordMatches).toEqual(true);
    });

    it("returns false if model has error", function () {
      form.password("apassword");

      var dcontroller = new PasswordConfirmationField.controller(attrs);
      dcontroller.setPasswordMatches("bpassword")
      expect(dcontroller.passwordMatches).toEqual(false);
    });
  });
});