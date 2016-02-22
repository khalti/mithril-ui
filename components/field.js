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
      getPrepend() {
        if(_.isString(attrs.label)) {
          return m('label', attrs.label);}
        else if (_.isObject(attrs.label) && attrs.label.prepend) {
          return m('label', attrs.label.text);}
        else if(_.isObject(attrs.label) && !attrs.label.prepend && !attrs.label.append) {
          return m('label', attrs.label.text);}},

      getAppend() {
        if(_.isObject(attrs.label) && attrs.label.append) {
          return m('label', attrs.label.text);}
        else if(attrs.help && !attrs.model.errors) {
          return m('label.help', attrs.help);}
        else if(attrs.model.errors) {
          return m('label.error', attrs.model.errors[0]);}},

      hasError() {
        if (!attrs.model.errors) {return false;}
        else if (attrs.model.errors.length > 0) {return true;}},

      getClass() {
        if (this.hasError()) return `${attrs.class} error`;
        return attrs.class;}};},

  view: function (ctrl, attrs)  {
    return m('div', {class: ctrl.getClass()},
      ctrl.getPrepend(),
      m.component(Input, attrs.input),
      ctrl.getAppend());
  }
}
