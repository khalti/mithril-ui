var m = require("mithril")
var _ = require("lodash")
var Input = require("./input.js")
var Field = require("./field.js")

// m.component(Checkbox, {
//   model: ,
//   label: ,
// });
module.exports = {
  view: function (ctrl, attrs) {
    attrs.class = "field";
    attrs.input = {
      class: "ui checkbox",
      type: "checkbox",
      append: m("label", attrs.label),
      onclick: m.withAttr("checked", attrs.model.setAndValidate),
      checked: attrs.model()
    }
    return m.component(Field, _.omit(attrs, ['label']));
  }
}
