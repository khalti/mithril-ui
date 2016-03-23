var m = require("mithril")
var _ = require("lodash")
var Input = require("./input.js")

// m.component(Field, {
//   'class': ,
//   'model': a FormModel instance,
//   'input': ,
//   'label': {text: , append: , prepend: },
// })
module.exports = {
  controller: function (attrs) {
    if (!_.isFunction(attrs.model)) throw Error("Please pass a model.")
    return {
      getPrepend: function () {
        if(_.isString(attrs.label)) {
          return m('label', attrs.label)}
        else if (_.isObject(attrs.label) && attrs.label.prepend) {
          return m('label', attrs.label.text)}
        else if(_.isObject(attrs.label) && !attrs.label.prepend && !attrs.label.append) {
          return m('label', attrs.label.text)}},

      getAppend: function () {
        if(_.isObject(attrs.label) && attrs.label.append) {
          return m('label', attrs.label.text)}
        else if(attrs.help && !attrs.model.errors()) {
          return m('label.help', attrs.help)}
        else if(attrs.model.errors() && !attrs.hideError) {
          return m('label.error', attrs.model.errors()[0])}},

      getClass: function () {
        var dClass = ""
        if (attrs.model.errors()) dClass = "field error"
        else dClass = "field"
        if (attrs.isInline) dClass = "inline " + dClass
        return dClass
    }}},

  view: function (ctrl, attrs)  {
    attrs.input.value = attrs.model()

    return m('div', {class: ctrl.getClass()},
      ctrl.getPrepend(),
      m.component(Input, attrs.input),
      ctrl.getAppend())
  }
}
