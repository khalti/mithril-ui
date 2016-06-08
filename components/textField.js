var m = require("mithril");
var _ = require("lodash");
var Input = require("./input.js");
var Field = require("./field.js");

// m.component(TextField, {
//   model: ,
//   label: ,
//   placeholder: ,
//   update: ,
//   validate: ,
//   append: ,
//   prepend: ,
//   help: ,
//   type: ,
// })
module.exports = {
  view: function (ctrl, attrs) {
    attrs.type = "text";
    return m.component(Field, attrs);
  }
}
