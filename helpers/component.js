var _ = require("lodash");
var m = require("mithril");

var isEmpty = function (array) {
  return array.length === 0;
};

var validateComponent = function (component) {
  if (!_.isObject(component)) {
    throw Error("Please pass a valid component.");
  }

  if (component.view && !_.isFunction(component.view)) {
    throw Error("View must be a function");
  }

  if (component.controller && !_.isFunction(component.controller)) {
    throw Error("Controller must be a function");
  }
};


module.exports = function (struct) {
  var s = struct;

  validateComponent(s);
  validateComponent(s.extend || {});

  if (!s.view && (!s.extend || !s.extend.view)) {
    throw Erro("Either base or new component must have a view.");
  }

  var func = function () {
    var argList = [];
    for(var i = 0; i < arguments.length; i++) {
      argList.push(arguments[i]);
    }

    return m.apply(m, [func].concat(argList));
  };

  func.controller = function (attrs) {
    var baseCtrl = s.extend.controller? new s.extend.controller(attrs) : {};
    var structCtrl = s.controller? new s.controller(attrs) : {};
    var newCtrl = _.clone(_.assign(baseCtrl, structCtrl));
    newCtrl.base = baseCtrl;
    return newCtrl;
  };

  func.view = s.view || s.extend.view;

  return func;
};
