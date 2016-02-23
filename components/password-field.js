import m from "mithril";
import _ from "lodash";
import Input from "./input.js";

// m.component(PasswordField, {
//   'model':,
//   'label':,
//   'strengthChecker':,
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

      getStrengthMeter() {
        if (!attrs.strengthChecker || !attrs.model.is_dirty()) return undefined;

        return m(".ui.bottom.attached.progress.success",
          m(".bar", {
            style: {
              "transition-duration": "300ms", width: `${attrs.strengthChecker(attrs.model())}%`}}));
      }};},

  view: function (ctrl, attrs) {
    attrs.input = {};
    attrs.input.placeholder = attrs.label;
    attrs.input.type = "password";
    attrs.input[attrs.event] = m.withAttr("value", attrs.model);
    return m('div', {class: ctrl.getClass()},
      m.component(Input, attrs.input),
      ctrl.getStrengthMeter(),
      ctrl.getAppend());
  }
};
