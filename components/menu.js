var base = require("./base.js");
var factory = require("./../factory.js");

var component = {
  controller: function (attrs) {
    return {
      getClassList: function (attrs) {
        return ["ui",
                "menu"];
      }
    };
  }
};

module.exports = factory(base, component);
