var m = require('mithril')
var _ = require('lodash')

// m.component(Input, {
//   'class':,
//   'append':,
//   'prepend':,
//   ...
// });
module.exports = {
  view: function (ctrl, attrs)  {
    var inputAttrs = _.omit(attrs, ['class', 'prepend', 'append']);
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
