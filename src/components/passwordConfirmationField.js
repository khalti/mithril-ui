var m = require("mithril");
var _ = require("lodash");
var input = require("./input.js");
var field = require("./field.js");

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
    var ctrl = field.controller(attrs);
    return ctrl;
  },

  view: function (ctrl, attrs) {
    var leftAttrs = _.difference(['model', 'update', 'validate', 'passwordModel'], _.keys(attrs));
    if (leftAttrs.length > 0) throw Error("'" + leftAttrs + "'" + " fields are required.");

    var checkClass = ".big.green.check.circle.outline.icon";
    attrs.input = {
      append: attrs.model.isValid(false)? m("i"+checkClass): undefined,
      placeholder: attrs.placeholder || "",
      type: "password",
      value: attrs.model()
    };

    if (attrs.update === attrs.validate) {
      attrs.input[attrs.update] = m.withAttr('value', attrs.model.setAndValidate);
    }
    else {
      attrs.input[attrs.update] = m.withAttr('value', attrs.model);
      attrs.input[attrs.validate] = function () {attrs.model.isValid();};
    }

    return m('div', {class: ctrl.getClass()},
             ctrl.getLabelPrepend(),
             m.component(input, attrs.input),
             ctrl.getLabelAppend());
  }
}
