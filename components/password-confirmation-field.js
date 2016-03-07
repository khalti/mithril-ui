import m from "mithril";
import _ from "lodash";
import Input from "./input.js";
import Field from "./field.js";

// m.component(PasswordConfirmationField, {
//   'model':,
//   'passwordModel':,
//   'label':,
//   'placeholder':,
//   'help':,
//   'event':,
// });
export default {
  controller: function (attrs) {
    let ctrl = Field.controller(attrs);
    ctrl.checkPasswordMatches = function (value) {
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
    let checkClass = ".big.green.check.circle.outline.icon";
    attrs.input = {};
    attrs.input.append = ctrl.passwordMatches? m(`i${checkClass}`): undefined;
    attrs.input.placeholder = attrs.label;
    attrs.input.type = "password";
    attrs.input[attrs.event] = m.withAttr("value", attrs.model);
    attrs.input.onkeyup = m.withAttr("value", ctrl.checkPasswordMatches);
    attrs.input.class = ctrl.getInputClass(attrs.input);
    attrs.value = attrs.model();
    return m('div', {class: ctrl.getClass()},
      ctrl.getPrepend(),
      m.component(Input, attrs.input),
      ctrl.getAppend());
  }
};
