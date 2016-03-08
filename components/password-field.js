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
//   'event':,
// });
module.exports = {
  controller: function (attrs) {
    var ctrl = Field.controller(attrs);
    ctrl.getStrengthMeter = function () {
      if (!attrs.strengthChecker || !attrs.model.is_dirty()) return undefined;
      return m(".ui.bottom.attached.progress.success",
        m(".bar", {
          style: {
            "transition-duration": "300ms", width: `${attrs.strengthChecker(attrs.model())}%`}}));
    };
    ctrl.getClass = function () {
      if (this.hasError()) return "field error";
      return "field";
    };
    return ctrl;
  },

  view: function (ctrl, attrs) {
    attrs.input = {};
    attrs.input.placeholder = attrs.placeholder;
    attrs.input.type = "password";
    attrs.input[attrs.event] = m.withAttr("value", attrs.model);
    attrs.value = attrs.model;
    return m('div', {class: ctrl.getClass()},
      ctrl.getPrepend(),
      m.component(Input, attrs.input),
      ctrl.getStrengthMeter(),
      ctrl.getAppend());
  }
};
