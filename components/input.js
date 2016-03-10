var m = require('mithril')
var _ = require('lodash')

// m.component(Input, {
//   'class':,
//   'append':,
//   'prepend':,
//   ...
// });
module.exports = {
  controller: function (attrs) {
    return {
      getClass: function (attrs) {
        if (!attrs.prepend && attrs.append && attrs.append.tag === "i") {
          return ".ui.icon.input"
        }
        else if (attrs.prepend && attrs.prepend.tag === "i" && !attrs.append) {
          return ".ui.left.icon.input"
        }
        else if (attrs.prepend && attrs.prepend.tag !== "i" && !attrs.append) {
          return ".ui.labeled.input"
        }
        else if (!attrs.prepend && attrs.append && attrs.append.tag !== "i") {
          return ".ui.right.labeled.input"
        }
        else if (attrs.prepend && attrs.prepend.tag !== "i" && attrs.append && attrs.append.tag !== "i") {
          return ".ui.right.labeled.input"
        }
        else if (attrs.prepend && attrs.prepend.tag !== "i" && attrs.append && attrs.append.tag === "i") {
          return ".ui.labeled.icon.input"
        }
        else if (attrs.prepend && attrs.prepend.tag === "i" && attrs.append && attrs.append.tag !== "i") {
          return ".ui.left.icon.right.labeled.input"
        }
        else {
          return ".ui.input"
        }
      }
    }
  },
  view: function (ctrl, attrs)  {
    var inputAttrs = _.omit(attrs, ['prepend', 'append']);
    if (inputAttrs.type === 'hidden') {
      inputAttrs.class = 'hidden';
    }
    return m('div', {class: ctrl.getClass(attrs)},
      attrs.prepend,
      m('input', inputAttrs),
      attrs.append
    );
  }
}
