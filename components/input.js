import m from 'mithril';
import _ from 'lodash';

export default {
  view: function (ctrl, attrs)  {
    return m('div', {class: attrs.class},
      m(attrs.prepend),
      m('input', _.omit(attrs, ['class', 'prepend', 'append'])),
      m(attrs.append));
    }
  }
