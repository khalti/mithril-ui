var Checkbox = require("../../components/checkbox.js")
var m = require('mithril')
var FormModel = require('../../utils/form-model.js')
var mock = require("../deps/mock.js")
var _ = require("lodash")

describe("components/checkbox", function () {
  var aCheckbox, root, vdom, attrs
  beforeEach(function () {
    root = mock.document.createElement("div")
    m.deps(mock.window)
    attrs = {
      model: FormModel({isTrue: {exclusion: {within: [false]}, default: true}}).isTrue,
      label: 'A label.'
    }

    aCheckbox = m.component(Checkbox, attrs)
  })

  it("sets class of <input> to 'ui checkbox'", function () {
    mock.requestAnimationFrame.$resolve()

    m.mount(root, aCheckbox)
    var inputDOM = root.childNodes[0].childNodes[1]

    expect(inputDOM.class).toMatch('ui checkbox')
  })

  it("sets input type to checkbox", function () {
    mock.requestAnimationFrame.$resolve()

    m.mount(root, aCheckbox)
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1]
    expect(inputDOM.getAttribute('type')).toEqual('checkbox')
  })

  it("creates <label> out of attrs.label", function () {
    mock.requestAnimationFrame.$resolve()

    m.mount(root, aCheckbox)
    var labelDOM = root.childNodes[0].childNodes[1].childNodes[2]
    expect(labelDOM.childNodes[0].nodeValue).toEqual('A label.')})

  it("sets the value of input's checked to the model's value", function () {
    mock.requestAnimationFrame.$resolve()

    m.mount(root, aCheckbox)
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1]
    expect(inputDOM.getAttribute('checked')).toEqual('true')
  })

  it("updates the value on click", function () {
    mock.requestAnimationFrame.$resolve()

    m.mount(root, aCheckbox)
    var inputDOM = root.childNodes[0].childNodes[1].childNodes[1]
    inputDOM.checked = false
    inputDOM.onclick({})
    expect(attrs.model()).toEqual(false)
  })
})
