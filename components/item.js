var base = require("./base.js");
var factory = require("./../helpers/factory.js");
var m = require("mithril");

var component = {
  controller: function (attrs) {
    return {
      getClassList: function (attrs) {
        return ["item"];
      }
    };
  },
  view: function (c, attrs) {
    c.validateAttrs(attrs, c.attrSchema);
    return m(attrs && attrs.node? attrs.node: "a", c.getFinalAttrs(c.getAttrs(arguments)), c.getChildren(arguments));
  }
};

module.exports = factory(base, component);
