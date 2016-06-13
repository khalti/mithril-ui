var m = require("mithril");
var _ = require("lodash");
var field = require("./field.js");

// m.component(selection, {
// label: ,
// model: ,
// options:
// })
// options = {value: , label: }
module.exports = {
  controller: function (attrs) {
    var ctrl = field.controller(attrs);
    ctrl.menuVisible = false;

    ctrl.toggleMenu = function () {
      this.menuVisible = !this.menuVisible;
    };

    ctrl.hideMenu = function () {
      this.menuVisible = false;
    };

    return ctrl;
  },

  view: function (ctrl, attrs)  {
    var leftAttrs = _.difference(['model', 'options'], _.keys(attrs));
    if (leftAttrs.length > 0) throw Error("'" + leftAttrs + "'" + " fields are required.");

    return m("div", {class: ctrl.getClass()},
             ctrl.getLabelPrepend(),
             m("select", {value: attrs.model(), onchange: m.withAttr("value", attrs.model.setAndValidate)},
               _.map(attrs.options, function (option) {
                 return m("option",
                          {value: option.value},
                          option.label);
               })),
             ctrl.getLabelAppend());
  }
};
