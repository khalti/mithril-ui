import m from "mithril";
import _ from "lodash";
import Input from "./input.js";
import Field from "./field.js";

// m.component(Checkbox, {
//   model: ,
//   label: ,
//   event: 'onchange'
// });
export default {
  view: function (ctrl, attrs) {
    attrs.class = "field";
    attrs.input = {
      class : "ui checkbox",
      type : "hidden",
      append : m("label", attrs.label),
      [attrs.event] : m.withAttr('value', attrs.model)
    }
    return m.component(Field, _.omit(attrs, ['label', 'event']));
  }
}
