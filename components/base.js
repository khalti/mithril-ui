var m = require("mithril");
var validate = require("validate.js");
var _ = require("lodash");

module.exports = {
  controller: function (attrs) {
    return {
      attrSchema: {},
      getTuples: function (attrs) {
        return [];
      },
      getClassList: function (tuples) {
        var classList = _.map(tuples, function (tuple) {
          return tuple[0][tuple[1]];
        });

        return _.filter(classList, function (aClass) {
          if (aClass === undefined) return false;
          if (aClass === "") return false;
          return true;
        });
      },
      getClass: function (attrs) {
        return this.getClassList(this.getTuples(attrs)).join(" ");
      },
      validateAttrs: function (attrs, schema) {
        if (!schema) return undefined;
        var errors = validate(attrs, schema);
        if (errors) throw Error(JSON.stringify(errors));
      },
      argsToList: function (args) {
        var argsList = [];
        for (var i = 0; i < args.length; i ++) {
          argsList.push(args[i]);
        }
        return argsList;
      },
      getChildren: function (args) {
        var flatArgs = _.flattenDeep(this.argsToList(args));
        if (flatArgs.length < 1) return [];
        return this.hasAttrs(flatArgs)? flatArgs.splice(2): flatArgs.splice(1);
      },
      hasAttrs: function (args) {
        var argsList = this.argsToList(args);
        if (argsList.length < 1) return false;
        return _.isObject(argsList[1]) && !_.isFunction(argsList[1])? true: false;
      },
      getAttrs: function (args) {
        var argsList = this.argsToList(args);
        return this.hasAttrs(argsList)? argsList[1]: {};
      },
      getFinalAttrs: function (attrs) {
        if (attrs.class) {
          var className = attrs.class;
          attrs.class = this.getClass(attrs) + " " + className;
        }
        return _.omit(attrs, _.keys(this.attrSchema));
      }
    };
  },
  view: function (c, attrs) {
    c.validateAttrs(attrs, c.attrSchema);
    return m("div", c.getFinalAttrs(c.getAttrs(arguments)), c.getChildren(arguments));
  }
};
