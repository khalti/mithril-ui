import m from 'mithril';
import _ from 'lodash';

// m.component(Input, {
//   'class':,
//   'append':,
//   'prepend':,
//   ...
// });
export default {
  view: function (ctrl, attrs)  {
    let inputAttrs = _.omit(attrs, ['class', 'prepend', 'append']);
    if (inputAttrs.type === 'hidden') {
      inputAttrs.class = 'hidden';
    }
    return m('div', {class: attrs.class || ''},
      attrs.prepend,
      m('input', inputAttrs),
      attrs.append
    );
  }
}
