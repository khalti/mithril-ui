var m = require("mithril");

module.exports = function (component) {
  return function () {
    var argsList = [];
    for(var i = 0; i < arguments.length; i++) {
      argsList.push(arguments[i]);
    }

    return m.apply(m, [component].concat(argsList));
  };
};
