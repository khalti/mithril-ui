var base = require("./base.js");
var _ = require("lodash");
var enums = require("./../helpers/enums.js");
var factory = require("./../helpers/factory.js");

var component = {
  controller: function (attrs) {
    return {
      attrSchema: {
        columns: {inclusion: {within: enums.properKeys(enums.columnsClassMap),
                              message: "^Invalid value '%{value}'."}},
        stretched: {inclusion: {within: [true, false],
                                message: "^%{value} is not a boolean value."}},
        color: {inclusion: {within: _.keys(enums.colorClassMap),
                            message: "^Invalid value '%{value}'."}},
        centered: {inclusion: {within: [true, false],
                               message: "^%{value} is not a boolean value."}},
        textAlignment: {inclusion: {within: _.keys(enums.textAlignmentClassMap),
                                    message: "^Invalid value '%{value}'."}},
        verticalAlignment: {inclusion: {within: _.keys(enums.verticalAlignmentClassMap),
                                        message: "^Invalid value '%{value}'."}},
        visible: {inclusion: {within: _.keys(enums.visibleClassMap),
                              message: "^Invalid value '%{value}'."}},
        reverse: {inclusion: {within: _.keys(enums.reverseClassMap),
                              message: "^Invalid value '%{value}'."}}
      },
      columnsClassMap: enums.columnsClassMap,
      stretchedClassMap: {
        true: "stretched",
        false: ""
      },
      colorClassMap: enums.colorClassMap,
      centeredClassMap: enums.centeredClassMap,
      textAlignmentClassMap: enums.textAlignmentClassMap,
      verticalAlignmentClassMap: enums.verticalAlignmentClassMap,
      visibleClassMap: enums.visibleClassMap,
      reverseClassMap: enums.reverseClassMap,
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
