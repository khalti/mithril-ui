var m = require("mithril");
var base = require("./base.js");
var _ = require("lodash");
var helpers = require("./../helpers.js");

module.exports = {
  controller: function (attrs) {
    var ctrl = {
      attrSchema: {
        columns: {inclusion: {within: _.keys(helpers.columnsClassMap),
                              message: "^Invalid value '%{value}'."}},
        stretched: {inclusion: {within: [true, false],
                                message: "^%{value} is not a boolean value."}},
        color: {inclusion: {within: _.keys(helpers.colorClassMap),
                            message: "^Invalid value '%{value}'."}},
        textAlignment: {inclusion: {within: _.keys(helpers.textAlignmentClassMap),
                                    message: "^Invalid value '%{value}'."}},
        verticalAlignment: {inclusion: {within: _.keys(helpers.verticalAlignmentClassMap),
                                        message: "^Invalid value '%{value}'."}},
        visible: {inclusion: {within: _.keys(helpers.visibleClassMap),
                              message: "^Invalid value '%{value}'."}}
      },
      columnsClassMap: helpers.columnsClassMap,
      stretchedClassMap: {
        true: "stretched",
        false: ""
      },
      colorClassMap: helpers.colorClassMap,
      textAlignmentClassMap: helpers.textAlignmentClassMap,
      verticalAlignmentClassMap: helpers.verticalAlignmentClassMap,
      visibleClassMap: helpers.visibleClassMap,
      getClassList: function (attrs) {
        return [this.columnsClassMap[attrs.columns],
                this.stretchedClassMap[attrs.stretched],
                this.colorClassMap[attrs.color],
                this.textAlignmentClassMap[attrs.textAlignment],
                this.verticalAlignmentClassMap[attrs.verticalAlignment],
                this.visibleClassMap[attrs.visible],
                "row"];
      }
    };

    return _.assign(base.controller(attrs), ctrl);
  },
  view: base.view
};
