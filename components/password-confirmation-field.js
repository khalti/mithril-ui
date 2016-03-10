var m = require("mithril")
var _ = require("lodash")
var Input = require("./input.js")
var Field = require("./field.js")

// m.component(PasswordConfirmationField, {
//   'model':,
//   'passwordModel':,
//   'label':,
//   'placeholder':,
//   'help':,
//   'update':,
//   'validate':,
// })
module.exports = {
  controller: function (attrs) {
    var ctrl = Field.controller(attrs)
    ctrl.getClass = function () {
      if (this.hasError()) return "field error"
      return "field"
    }
    return ctrl
  },

  view: function (ctrl, attrs) {
    var checkClass = ".big.green.check.circle.outline.icon"
    attrs.input = {
      append: attrs.model.isValid()? m("i"+checkClass): undefined,
      placeholder: attrs.placeholder || "",
      type: "password",
      value: attrs.model()
    }

    if (attrs.update === attrs.validate) {
      attrs.input[attrs.update] = m.withAttr('value', attrs.model.setAndValidate)
    }
    else {
      attrs.input[attrs.update] = m.withAttr('value', attrs.model)
      attrs.input[attrs.validate] = function () {attrs.model.isValid()}
    }

    return m('div', {class: ctrl.getClass()},
      ctrl.getPrepend(),
      m.component(Input, attrs.input),
      ctrl.getAppend())
  }
}
