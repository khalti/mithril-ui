var m = require("mithril")
var _ = require("lodash")
var Input = require("./input.js")
var Field = require("./field.js")

// m.component(Checkbox, {
//   model: ,
//   label: ,
// });
module.exports = {
  controller: function (attrs) {
    var ctrl = Field.controller(attrs)
    ctrl.toggleState = function () {
      attrs.model.setAndValidate(!attrs.model())
    }
    return ctrl
  },
  view: function (ctrl, attrs) {
    var label = attrs.label
    delete attrs.label

    return m('div', {class: ctrl.getClass(), onclick: ctrl.toggleState},
      ctrl.getPrepend(),
      m(".ui.checkbox", {class: attrs.model()? "checked": ""},
        m("input.hidden[type=checkbox][tabindex=0]", {checked: attrs.model()}),
        m("label", label)),
      ctrl.getAppend())
  }
}
