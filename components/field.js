import m from "mithril";
import _ from "lodash";
import Input from "./input.js";

// m.component(Field, {
//   'class': ,
//   'model': a FormModel instance,
//   'input': ,
//   'label': {text: , append: , prepend: },
// });
export default {
  controller: function (attrs) {
    if (!_.isFunction(attrs.model)) throw Error("Please pass a model.");
    return {
      get_prepend() {
        if(_.isString(attrs.label)) {
          return m('label', attrs.label);}
        else if (_.isObject(attrs.label) && attrs.label.prepend) {
          return m('label', attrs.label.text);}
        else if(_.isObject(attrs.label) && !attrs.label.prepend && !attrs.label.append) {
          return m('label', attrs.label.text);}},

      get_append() {
        if(_.isObject(attrs.label) && attrs.label.append) {
          return m('label', attrs.label.text);}
        else if(attrs.help && !attrs.model.errors) {
          return m('label.help', attrs.help);}
        else if(attrs.model.errors) {
          return m('label.error', attrs.model.errors[0]);}},

      has_error() {
        if (!attrs.model.errors) {return false;}
        else if (attrs.model.errors.length > 0) {return true;}},

      get_class() {
        if (this.has_error()) return `${attrs.class} error`;
        return attrs.class;}};},

  view: function (ctrl, attrs)  {
    return m('div', {class: ctrl.get_class()},
      ctrl.get_prepend(),
      m.component(Input, attrs.input),
      ctrl.get_append());
  }
}
