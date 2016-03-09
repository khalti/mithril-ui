var m = require("mithril")
var _ = require("lodash")
var Input = require("./input.js")
var Field = require("./field.js")

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
module.exports = {
  controller: function (attrs) {
    return {
      getInputClass: function () {
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
      placeholder: attrs.placeholder
    }
    attrs.input[attrs.event] = m.withAttr('value', attrs.model)
    return m.component(Field, _.omit(attrs, ['placeholder', 'event', 'type']));
  }
};
