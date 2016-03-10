var m = require("mithril")
var _ = require("lodash")
var Input = require("./input.js")
var Field = require("./field.js")

// m.component(TextField, {
//   model: ,
//   label: ,
//   placeholder: ,
//   update: ,
//   validate: ,
//   append: ,
//   prepend: ,
//   help: ,
//   type: ,
// })
module.exports = {
  view: function (ctrl, attrs) {
    attrs.input = {
      prepend: attrs.prepend,
      append: attrs.append,
      type: attrs.type || 'text',
      placeholder: attrs.placeholder
    }

    if (attrs.update === attrs.validate) {
      attrs.input[attrs.update] = m.withAttr('value', attrs.model.setAndValidate)
    }
    else {
      attrs.input[attrs.update] = m.withAttr('value', attrs.model)
      attrs.input[attrs.validate] = function () {attrs.model.isValid()}
    }

    return m.component(Field, _.omit(attrs, ['placeholder', 'event', 'type']))
  }
}
