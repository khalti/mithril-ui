import m from "mithril";
import _ from "lodash";
import Input from "./input.js";
import Field from "./field.js";

// m.component(Checkbox, {
//   model: ,
//   label: ,
// });
export default {
  view: function (ctrl, attrs) {
    attrs.class = "field";
    attrs.input = {
      class : "ui checkbox",
      type : "checkbox",
      append : m("label", attrs.label),
      onclick : m.withAttr("checked", attrs.model),
      checked: attrs.model()
    }
    return m.component(Field, _.omit(attrs, ['label']));
  }
}
