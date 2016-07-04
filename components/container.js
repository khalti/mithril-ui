var m = require("mithril");
var validate = require("validate.js");

var container = {
  controller_blueprint: {
    typeClassMap: {
      "text": "text",
      "fluid": "fluid"
    },
    alignmentClassMap: {
      "left": "left aligned",
      "center": "center aligned",
      "right": "right aligned",
      "justified": "justified"
    },
    attrSchema: {
      type: {presence: false,
              inclusion: {within: ["text", "fluid"],
                          message: "^Invalid value '%{value}' for attribute 'type'."}},
      alignment: {presence: false,
                  inclusion: {within: ["left", "center", "right", "justified"],
                              message: "^Invalid value '%{value}' for attribute 'alignment'."}}
    },
    mapClass: function (map, key) {
      return map[key];
    },
    getClassList: function (attrs) {
      var classList = ["ui",
                        this.mapClass(this.typeClassMap, attrs.type),
                        this.mapClass(this.alignmentClassMap, attrs.alignment),
                      "container"];
      return _.filter(classList, function (aClass) {
        return aClass !== undefined;
      });
    },
    getClass: function (attrs) {
      return this.getClassList(attrs).join(" ");
    },
    validateAttrs: function (attrs) {
      var errors = validate(attrs, this.attrSchema);
      console.log(errors);
      if (errors) throw(errors.stringify());
    },
    getChildren: function (args) {
      var argsArray = [];
      for (var i = 0; i <= args.length; i ++) {
        argsArray.push(args[i]);
      }

      return argsArray.splice(2);
    }
  },
  controller: function (attrs) {
    return container.controller_blueprint;
  },
  view: function (ctrl, attrs) {
    ctrl.validateAttrs(attrs);
    return m("div", {class: ctrl.getClass(attrs)}, ctrl.getChildren(arguments));
  }
};

module.exports = container;
