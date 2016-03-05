import m from "mithril";
import _ from "lodash";
import Input from "./input.js";
import Field from "./field.js";

// m.component(TextField, {
//   model: ,
//   label: ,
//   placeholder: ,
//   event: ,
//   append: ,
//   prepend: ,
//   help: ,
//   type: ,
// });
export default {
  controller: function (attrs) {
    return {
      getInputClass() {
        if (!attrs.prepend && !attrs.append) {
          return "ui input";
        }
        else if (attrs.prepend && !attrs.append) {
          return "ui labeled input";
        }
        else if (attrs.append) {
          return "ui right labeled input";
        }
      }
    };
  },
  view: function (ctrl, attrs) {
    attrs.class = "field";
    attrs.input = {
      class : ctrl.getInputClass(),
      prepend: attrs.prepend,
      append: attrs.append,
      type: attrs.type || 'text',
      [attrs.event] : m.withAttr('value', attrs.model),
      placeholder: attrs.placeholder
    }
    return m.component(Field, _.omit(attrs, ['placeholder', 'event', 'type']));
  }
};