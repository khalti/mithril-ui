var TextField = require("../../components/text-field.js")
var m = require('mithril')
var FormModel = require('../../utils/form-model.js')
var mock = require("../deps/mock.js")

describe("components/text-field", function () {
  var root, attrs

  beforeEach(function () {
    root = mock.document.createElement("div")
    m.deps(mock.window)
    attrs = {
      model: FormModel({username: {presence: true}}).username,
      placeholder: "Placeholder",
      help: "A help.",
      update: "onkeyup",
      validate: "onchange"
    }
  })

  it("appends the help text.", function () {
    mock.requestAnimationFrame.$resolve()

    m.mount(root, m.component(TextField, attrs))
    var helpDOM = root.childNodes[0].childNodes[2]

    expect(helpDOM.childNodes[0].nodeValue).toEqual(attrs.help)
  })

  it("sets input's placeholder to attrs.placeholder", function () {
    mock.requestAnimationFrame.$resolve()

    m.mount(root, m.component(TextField, attrs))
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1]

    expect(inputDOM.getAttribute('placeholder')).toEqual(attrs.placeholder)
  })

  it("sets input's type to text if no attrs.type is passed", function () {
    mock.requestAnimationFrame.$resolve()

    m.mount(root, m.component(TextField, attrs))
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1]

    expect(inputDOM.getAttribute('type')).toEqual("text")
  })

  it("sets input's type to attrs.type", function () {
    mock.requestAnimationFrame.$resolve()

    attrs.type = "number"
    m.mount(root, m.component(TextField, attrs))
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1]

    expect(inputDOM.getAttribute('type')).toEqual(attrs.type)
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
})
