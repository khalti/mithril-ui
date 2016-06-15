var m = require("mithril");
var _ = require("lodash");
var field = require("./field.js");

// m.component(Checkbox, {
//   model: ,
//   label: ,
// });
module.exports = {
  controller: function (attrs) {
    var ctrl = field.controller(attrs);
    ctrl.toggleState = function () {
      attrs.model.setAndValidate(!attrs.model());
    };
    ctrl.getLabelAppend =  function () {
      if(attrs.help && !attrs.model.errors()) {
        return m('label.help', attrs.help);
      }
      else if(attrs.model.errors() && !attrs.hideError) {
        return m('label.error', attrs.model.errors()[0]);
      }
      return null;
    };
    return ctrl;
  },
  view: function (ctrl, attrs) {
    var leftAttrs = _.difference(['model', 'label'], _.keys(attrs));
    if (leftAttrs.length > 0) throw Error("'" + leftAttrs + "'" + " fields are required.");

    return m('div', {class: ctrl.getClass(), onclick: ctrl.toggleState},
             //ctrl.getLabelPrepend(),
             m(".ui.checkbox", {class: attrs.model()? "checked": ""},
               m("input.hidden[type=checkbox][tabindex=0]", {checked: attrs.model()}),
               m("label", attrs.label)),
             ctrl.getLabelAppend());
  }
}
