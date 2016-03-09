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
//   'event':,
// });
module.exports = {
  controller: function (attrs) {
    var ctrl = Field.controller(attrs);
    ctrl.setPasswordMatches = function (value) {
      if (attrs.passwordModel() == value) {
        ctrl.passwordMatches = true;
      }
      else {
        ctrl.passwordMatches = false;
      }
    };
    ctrl.getClass = function () {
      if (this.hasError()) return "field error";
      return "field";
    };
    ctrl.getInputClass = function (inputAttrs) {
      if (!inputAttrs.prepend && !inputAttrs.append) {
        return "ui input";
      }
      else if (inputAttrs.prepend && !inputAttrs.append) {
        return "ui labeled input";
      }
      else if (inputAttrs.append) {
        return "ui icon input";
      }
    };
    return ctrl;
  },

  view: function (ctrl, attrs) {
    var checkClass = ".big.green.check.circle.outline.icon";
    attrs.input = {
      append: ctrl.passwordMatches? m(`i${checkClass}`): undefined,
      placeholder: attrs.placeholder || "",
      type: "password",
      onkeyup: m.withAttr("value", ctrl.setPasswordMatches),
      // value: attrs.model()
    }
    attrs.input[attrs.event] = m.withAttr("value", attrs.model);
    attrs.input.class = ctrl.getInputClass(attrs.input);
    return m('div', {class: ctrl.getClass()},
      ctrl.getPrepend(),
      m.component(Input, attrs.input),
      ctrl.getAppend());
  }
};
