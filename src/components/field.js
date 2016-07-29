var m = require("mithril");
var _ = require("lodash");
var Input = require("./input.js");

// m.component(Field, {
//   'class': ,
//   'model': a FormModel instance,
//   'input': ,
//   'label': {text: , append: , prepend: },
// })
module.exports = {
  controller: function (attrs) {
    return {
      getLabelPrepend: function () {
        if(_.isString(attrs.label)) {
          return m('label', attrs.label);
        }
        else if (_.isObject(attrs.label) && attrs.label.prepend) {
          return m('label', attrs.label.text);
        }
        else if(_.isObject(attrs.label) && !attrs.label.prepend && !attrs.label.append) {
          return m('label', attrs.label.text);
        }
      },

      getLabelAppend: function () {
        if(_.isObject(attrs.label) && attrs.label.append) {
          return m('label', attrs.label.text);
        }
        else if(attrs.help && !attrs.model.errors()) {
          return m('label.help', attrs.help);
        }
        else if(attrs.model.errors() && !attrs.hideError) {
          return m('label.error', attrs.model.errors()[0]);
        }
      },

      getClass: function () {
        var dClass = "";
        if (attrs.model.errors() && !attrs.hideError) dClass = "field error";
        else dClass = "field";
        if (attrs.isInline) dClass = "inline " + dClass;
        return dClass;
      }
    };
  },

  view: function (ctrl, attrs)  {
    var leftAttrs = _.difference(['model', 'update', 'validate', 'type'], _.keys(attrs));
    if (leftAttrs.length > 0) throw Error("'" + leftAttrs + "'" + " fields are required.");

    //attrs.input.value = attrs.model()
    attrs.input = {
      prepend: attrs.prepend,
      append: attrs.append,
      type: attrs.type,
      placeholder: attrs.placeholder,
      value: attrs.model(),
      class: attrs.input? attrs.input.class : false
    };


    if (attrs.update === attrs.validate) {
      attrs.input[attrs.update] = m.withAttr('value', attrs.model.setAndValidate);
    }
    else {
      attrs.input[attrs.update] = m.withAttr('value', attrs.model);
      attrs.input[attrs.validate] = function () {attrs.model.isValid();};
    }

    return m('div', {class: ctrl.getClass()},
             ctrl.getLabelPrepend(),
             m.component(Input, attrs.input),
             ctrl.getLabelAppend());
  }
};
