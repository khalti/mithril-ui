var base = require("./components/base.js");
var _ = require("lodash");

module.exports = function (base, mixin) {
  if ((base.controller && !_.isFunction(base.controller)) || (base.view && !_.isFunction(base.view))) {
    throw Error("Invalid base component.");
  }
  if ((mixin.controller && !_.isFunction(mixin.controller)) || (mixin.view && !_.isFunction(mixin.view))) {
    throw Error("Invalid sub component.");
  }
  return {
    controller: function (attrs) {
      return _.assign(new base.controller(attrs), new mixin.controller(attrs));
    },
    view: mixin.view || base.view
  };
};
