var PasswordConfirmationField = require("../../components/password-confirmation-field.js")
var TextField = require("../../components/text-field.js")
var FormModel = require("../../utils/form-model.js")
var m = require("mithril")
var mock = require("../deps/mock.js")

describe("components/password-confirmation-field", function () {
  var root, attrs, form
  beforeEach(function () {
    root = mock.document.createElement("div")
    m.deps(mock.window)

    var constrains = {
      password: {presence: true},
      confirmPassword: {equality: "password"}
    }

    form = FormModel(constrains)
    attrs = {
      "model": form.confirmPassword,
      "label": "Confirm Password",
      "placeholder": "A placeholder",
      "update": 'onkeyup',
      "validate": 'onchange',
      "help": "A help."
    }
  })

  it("sets input type to 'password'", function () {
    spyOn(m, 'component')

    PasswordConfirmationField.view(new PasswordConfirmationField.controller(attrs), attrs)

    var secondArg = m.component.calls.argsFor(0)[1]
    expect(secondArg.type).toEqual("password")
  })

  it("sets input's placeholder to attrs.placeholder is present", function () {
    spyOn(m, 'component')

    PasswordConfirmationField.view(new PasswordConfirmationField.controller(attrs), attrs)

    var secondArg = m.component.calls.argsFor(0)[1]
    expect(secondArg.placeholder).toEqual(attrs.placeholder)
  })

  it("sets input's placeholder to '' is attrs.placeholder is undefined", function () {
    spyOn(m, 'component')

    attrs.placeholder = undefined
    PasswordConfirmationField.view(new PasswordConfirmationField.controller(attrs), attrs)

    var secondArg = m.component.calls.argsFor(0)[1]
    expect(secondArg.placeholder).toEqual("")
  })

  it("sets the value of input to attrs.model", function () {
    spyOn(m, 'component')

    attrs.model("a password")
    PasswordConfirmationField.view(new PasswordConfirmationField.controller(attrs), attrs)

    var secondArg = m.component.calls.argsFor(0)[1]
    expect(secondArg.value).toEqual("a password")
   })

  it("shows check mark if password is confirmed", function () {
    mock.requestAnimationFrame.$resolve()

    form.password("apassword")

    m.mount(root, {
      view: function () {
        return m.component(PasswordConfirmationField, attrs)}})

    var input = root.childNodes[0].childNodes[1].childNodes[1]
    input.value = form.password()
    input[attrs.update]({})
    m.redraw(true)

    var append = root.childNodes[0].childNodes[1].childNodes[2]
    expect(append.nodeName).toEqual("I")
  })

  it("hides check mark if password is not confirmed", function () {
    mock.requestAnimationFrame.$resolve()
    form.password("apassword")

    m.mount(root, {
      view: function () {
        return m.component(PasswordConfirmationField, attrs)}})

    var input = root.childNodes[0].childNodes[1].childNodes[1]
    input.value = "bpassword"
    input[attrs.update]({})
    m.redraw(true)

    var append = root.childNodes[0].childNodes[1].childNodes[2]
    expect(append.nodeValue).toEqual("")
  })

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

    form.password("password")
    form.confirmPassword("bpassword")
    inputDOM[attrs.validate]({})
    expect(attrs.model.errors).toBeDefined()
  })

  it("updates and validates the value if attrs.update and attrs.validate are same", function() {
    attrs.update = "onchange"
    mock.requestAnimationFrame.$resolve()

    form.password("password")

    m.mount(root, m.component(TextField, attrs))
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1]

    // for valid data
    inputDOM.value = "password"
    inputDOM[attrs.validate]({})
    expect(attrs.model()).toBeDefined("earth")
    expect(attrs.model.errors).not.toBeDefined()

    // for invalid data
    inputDOM.value = "x"
    inputDOM[attrs.validate]({})
    expect(attrs.model()).toBeDefined("")
    form.confirmPassword.isValid()
    expect(attrs.model.errors).toBeDefined()
  })
})