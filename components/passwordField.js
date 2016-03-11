var m = require("mithril")
var _ = require("lodash")
var Input = require("./input.js")
var Field = require("./field.js")

// m.component(PasswordField, {
//   'model':,
//   'label':,
//   'placeholder':,
//   'strengthChecker':,
//   'help':,
//   'update':,
//   'validate':,
// })
module.exports = {
  controller: function (attrs) {
    var ctrl = Field.controller(attrs)
    ctrl.getStrengthMeter = function () {
      if (!attrs.strengthChecker || !attrs.model.isDirty()) return undefined
      return m(".ui.bottom.attached.progress.success",
        m(".bar", {
          style: {
            "transition-duration": "300ms", width: attrs.strengthChecker(attrs.model())+"%"}}))
    }
    ctrl.getClass = function () {
      if (attrs.model.errors()) return "field error"
      return "field"
    }
    return ctrl
  },

  view: function (ctrl, attrs) {
    attrs.input = {
      placeholder: attrs.placeholder || '',
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
      ctrl.getStrengthMeter(),
      ctrl.getAppend())
  }
}
