import m from 'mithril';
import _ from 'lodash';

export default {
  controller: function (attrs) {
    if (!_.isFunction(attrs.model)) throw Error("Please pass a model.");
    return {
      get_prepend() {
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

      get_append() {
        if(_.isObject(attrs.label) && attrs.label.append) {
          return m('label', attrs.label.text);
          }
        else if(attrs.help && !attrs.model.errors) {
          return m('label.help', attrs.help);
          }
        else if(attrs.model.errors) {
          return m('.ui.pointing.red.basic.label', attrs.model.errors[0]);
          }
        }
      };
   },

  view: function (ctrl, attrs)  {
    attrs.input.attrs.model = attrs.model;

    return m('div', {class: attrs.class},
      ctrl.get_prepend(),
      attrs.input,
      ctrl.get_append());
    }
  }
