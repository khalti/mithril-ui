var m = require("mithril");
var base = require("./base.js");
var _ = require("lodash");
var helpers = require("./../helpers.js");
var factory = require("./../factory.js");

var component = {
  controller: function (attrs) {
    return {
      attrSchema: {
        columns: {inclusion: {within: _.keys(helpers.columnsClassMap),
                              message: "^Invalid value '%{value}'."}},
        stretched: {inclusion: {within: [true, false],
                                message: "^%{value} is not a boolean value."}},
        color: {inclusion: {within: _.keys(helpers.colorClassMap),
                            message: "^Invalid value '%{value}'."}},
        centered: {inclusion: {within: [true, false],
                               message: "^%{value} is not a boolean value."}},
        textAlignment: {inclusion: {within: _.keys(helpers.textAlignmentClassMap),
                                    message: "^Invalid value '%{value}'."}},
        verticalAlignment: {inclusion: {within: _.keys(helpers.verticalAlignmentClassMap),
                                        message: "^Invalid value '%{value}'."}},
        visible: {inclusion: {within: _.keys(helpers.visibleClassMap),
                              message: "^Invalid value '%{value}'."}},
        reverse: {inclusion: {within: _.keys(helpers.reverseClassMap),
                              message: "^Invalid value '%{value}'."}}
      },
      columnsClassMap: helpers.columnsClassMap,
      stretchedClassMap: {
        true: "stretched",
        false: ""
      },
      colorClassMap: helpers.colorClassMap,
      centeredClassMap: helpers.centeredClassMap,
      textAlignmentClassMap: helpers.textAlignmentClassMap,
      verticalAlignmentClassMap: helpers.verticalAlignmentClassMap,
      visibleClassMap: helpers.visibleClassMap,
      reverseClassMap: helpers.reverseClassMap,
      getClassList: function (attrs) {
        return [this.columnsClassMap[attrs.columns],
                this.stretchedClassMap[attrs.stretched],
                this.colorClassMap[attrs.color],
                this.centeredClassMap[attrs.centered],
                this.textAlignmentClassMap[attrs.textAlignment],
                this.verticalAlignmentClassMap[attrs.verticalAlignment],
                this.visibleClassMap[attrs.visible],
                this.reverseClassMap[attrs.reverse],
                "row"];
      }
    };
  }
};

module.exports = factory(base, component);
