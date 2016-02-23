import m from "mithril";
import _ from "lodash";
import Input from "./input.js";

// m.component(PasswordConfirmationField, {
//   'model':,
//   'label':,
//   'help':,
//   'event':,
// });
export default {
  controller: function (attrs) {
    if (!_.isFunction(attrs.model)) throw Error("Please pass a model.");
    return {
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
        if (this.hasError()) return "field error";
        return "field";},

      passwordMatches() {
        return attrs.model.is_dirty() && !attrs.model.errors? true: false;
      }
    };
  },

  view: function (ctrl, attrs) {
    let checkClass = ".check.circle.outline.icon";
    attrs.input = {};
    attrs.input.placeholder = attrs.label;
    attrs.input.type = "password";
    attrs.input[attrs.event] = m.withAttr("value", attrs.model);
    attrs.input.append = ctrl.passwordMatches()? m(`i${checkClass}`): undefined;
    return m('div', {class: ctrl.getClass()},
      m.component(Input, attrs.input));
  }
};
