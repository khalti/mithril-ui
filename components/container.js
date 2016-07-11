var base = require("./base.js");
var component = require("./../helpers/component.js");

var struct = {
  extend: base,
  controller: function (attrs) {
    return {
      attrSchema: {
        type: {presence: false,
               inclusion: {within: ["text", "fluid"],
                           message: "^Invalid value '%{value}' for attribute 'type'."}},
        alignment: {presence: false,
                    inclusion: {within: ["left", "center", "right", "justified"],
                                message: "^Invalid value '%{value}' for attribute 'alignment'."}}
      },
      typeClassMap: {
        "text": "text",
        "fluid": "fluid"
      },
      alignmentClassMap: {
        "left": "",
        "center": "center aligned",
        "right": "right aligned",
        "justified": "justified"
      },
      getClassList: function (attrs) {
        return ["ui",
                this.typeClassMap[attrs.type],
                this.alignmentClassMap[attrs.alignment],
                "container"];
      }
    };
  }
};

module.exports = component(struct);
