var TextField = require("../../components/textField.js")
var m = require('mithril')
var Form = require('mithril-form')
var mock = require("../deps/mock.js")

describe("components/text-field", function () {
  var root, attrs

  beforeEach(function () {
    root = mock.document.createElement("div")
    m.deps(mock.window)
    attrs = {
      model: Form({username: {presence: true}}).username,
      placeholder: "Placeholder",
      help: "A help.",
      update: "onkeyup",
      validate: "onchange"
    }
  })


})
