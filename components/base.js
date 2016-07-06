var m = require("mithril");
var validate = require("validate.js");
var _ = require("lodash");

module.exports = {
  controller: function (attrs) {
    return {
      attrSchema: {},
      getClassList: function (attrs) {
        // this is a function instead of an attribute
        // coz we need attributes while resolving class
        return [];
      },
      insertUserClass: function (classList, userClass) {
        if (classList.length == 0) {
          return [userClass];
        }
        else if (classList.length == 1) {
          classList.unshift(userClass);
          return classList;
        }
        else {
          classList.splice(1,0, userClass);
          return classList;
        }
      },
      filterClassList: function (classList) {
        return _.filter(classList, function (aClass) {
          if (aClass === undefined) return false;
          if (aClass === "") return false;
          return true;
        });
      },
      getClass: function (attrs) {
        return this.filterClassList(
          this.insertUserClass(
            this.getClassList(attrs), attrs.class)).join(" ");
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
        if (flatArgs.length === 1) return [];
        return this.hasAttrs(flatArgs)? flatArgs.splice(2): flatArgs.splice(1);
      },
      hasAttrs: function (args) {
        var argsList = this.argsToList(args);
        if (argsList.length === 1) return false;
        var secArg = argsList[1];
        return _.isObject(secArg) && !secArg.tag && !secArg.view? true: false;
      },
      getAttrs: function (args) {
        var argsList = this.argsToList(args);
        return this.hasAttrs(argsList)? argsList[1]: {};
      },
      getFinalAttrs: function (attrs) {
        attrs.class = this.getClass(attrs);
        return _.omit(attrs, _.keys(this.attrSchema));
      }
    };
  },
  view: function (c, attrs) {
    c.validateAttrs(attrs, c.attrSchema);
    return m("div", c.getFinalAttrs(c.getAttrs(arguments)), c.getChildren(arguments));
  }
};
