var m = require("mithril");

module.exports = function (component) {
  return function () {
    var argList = [];
    for(var i = 0; i < arguments.length; i++) {
      argList.push(arguments[i]);
    }

    return m.apply(m, [component].concat(argList));
  };
};
