var Field = require("../../components/field.js")
var Input = require("../../components/input.js")
var FormModel = require("../../utils/formModel.js")
var m = require("mithril")
var mock = require("../deps/mock.js")

describe("components/field", function () {
  var attrs
  var root
  var aModel

  beforeEach(function () {
    aModel = FormModel({username: {presence: true, default: "1"}}).username
    root = mock.document.createElement("div")
    m.deps(mock.window)
    attrs = {
      model: aModel,
      input: {class: 'aClass'}
    }
  })

  it("sets the class of root div to 'field'", function () {
    mock.requestAnimationFrame.$resolve()

    var aField = m.component(Field, attrs)
    m.mount(root, aField)

    expect(root.childNodes[0].class).toEqual('field')
    })

  it("prepends the attrs.label if it is a text", function () {
    mock.requestAnimationFrame.$resolve()

    attrs.label = 'Username'
    var aField = m.component(Field, attrs)
    m.mount(root, aField)

    var labelDOM = root.childNodes[0].childNodes[0]

    expect(labelDOM.nodeName).toEqual('LABEL')
    expect(labelDOM.childNodes[0].nodeValue).toEqual(attrs.label)
  })

  it("prepends the attrs.label.text if attrs.label.prepend is true", function () {
    mock.requestAnimationFrame.$resolve()

    attrs.label = {text: 'Username', prepend: true}
    var aField = m.component(Field, attrs)
    m.mount(root, aField)

    var labelDOM = root.childNodes[0].childNodes[0]

    expect(labelDOM.nodeName).toEqual('LABEL')
    expect(labelDOM.childNodes[0].nodeValue).toEqual(attrs.label.text)
  })

  it("appends the attrs.label.text if attrs.label.append is false", function () {
    mock.requestAnimationFrame.$resolve()

    attrs.label = {text: 'Username', append: true}
    var aField = m.component(Field, attrs)
    m.mount(root, aField)

    var labelDOM = root.childNodes[0].childNodes[2]

    expect(labelDOM.nodeName).toEqual('LABEL')
    expect(labelDOM.childNodes[0].nodeValue).toEqual(attrs.label.text)
  })

  it("prepends the attrs.label.text if attrs.label.prepend and attrs.label.append are not set", function () {
    mock.requestAnimationFrame.$resolve()

    attrs.label = {text: 'Username', append: true}
    var aField = m.component(Field, attrs)
    m.mount(root, aField)

    var labelDOM = root.childNodes[0].childNodes[2]

    expect(labelDOM.nodeName).toEqual('LABEL')
    expect(labelDOM.childNodes[0].nodeValue).toEqual(attrs.label.text)
  })

  it("passes attrs.input to Input component", function () {
    mock.requestAnimationFrame.$resolve()

    attrs.label = {text: 'Username', append: true}
    var aField = m.component(Field, attrs)
    m.mount(root, aField)

    var inputDOM = root.childNodes[0].childNodes[1]

    expect(inputDOM.class).toEqual(attrs.input.class)
  })

  it("appends the attrs.help", function () {
    mock.requestAnimationFrame.$resolve()

    attrs.help = 'Username'

    var aField = m.component(Field, attrs)
    m.mount(root, aField)

    var helpDOM = root.childNodes[0].childNodes[2]

    expect(helpDOM.childNodes[0].nodeValue).toEqual(attrs.help)
  })

  it("appends the error text", function () {
    mock.requestAnimationFrame.$resolve()

    attrs.model.errors(['An error.'])
    var aField = m.component(Field, attrs)
    m.mount(root, aField)

    var errorDOM = root.childNodes[0].childNodes[2]

    expect(errorDOM.childNodes[0].nodeValue).toEqual(attrs.model.errors()[0])
  })

  it("removes the help text if there is an error", function () {
    mock.requestAnimationFrame.$resolve()

    attrs.help = "A help."
    attrs.model.errors(['An error.'])
    var aField = m.component(Field, attrs)
    m.mount(root, aField)

    var errorDOM = root.childNodes[0].childNodes[2]

    expect(errorDOM.childNodes[0].nodeValue).toEqual(attrs.model.errors()[0])
  })

  it("adds 'error' class to the root element if the model as an error", function () {
    mock.requestAnimationFrame.$resolve()

    attrs.help = "A help."
    attrs.model.errors(['An error.'])
    var aField = m.component(Field, attrs)
    m.mount(root, aField)

    expect(root.childNodes[0].class).toMatch('error')
  })

  it("binds model to value of input", function () {
    mock.requestAnimationFrame.$resolve()
    attrs.model("1")

    var aField = m.component(Field, attrs)
    m.mount(root, aField)

    var input = root.childNodes[0].childNodes[1].childNodes[1]

    expect(input.value).toEqual(attrs.model())
  })
})
