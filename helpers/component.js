var _ = require("lodash");

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

  return {
    controller: function (attrs) {
      var baseCtrl = s.extend && s.extend.controller? new s.extend.controller(attrs) : {};
      var structCtrl = s && s.controller? new s.controller(attrs) : {};
      var newCtrl = _.clone(_.assign(baseCtrl, structCtrl));
      newCtrl.base = baseCtrl;
      return newCtrl;
    },
    view: s.view || s.extend.view
  };
};
