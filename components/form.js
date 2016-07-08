var base = require("./base.js");
var factory = require("./../helpers/factory.js");

var component = {
  controller: function (attrs) {
    return {
      getClassList: function (attrs) {
        return ["ui",
                "form"];
      }
    };
  },
  view: function (c, attrs) {
    c.validateAttrs(attrs, c.attrSchema);
    return m("form", c.getFinalAttrs(c.getAttrs(arguments)), c.getChildren(arguments));
  }
};

module.exports = factory(base, component);
