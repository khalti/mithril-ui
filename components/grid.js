var m = require("mithril");
var base = require("./base.js");
var _ = require("lodash");
var helpers = require("./../helpers.js");

var divideClassMap = {
  "horizontally": "divided",
  "vertically": "vertically divided"
};

var cellClassMap = {
  "externally": "celled",
  "internally": "internally celled"
};

var equalWidthClassMap = {
  true: "equal width",
  false: ""
};

var paddedClassMap = {
  true: "padded",
  false: ""
};

var relaxedClassMap = {
  true: "relaxed",
  false: ""
};

var centeredClassMap = {
  true: "centered",
  false: ""
};

var doublingClassMap = {
  true: "doubling",
  false: ""
};

var stackableClassMap = {
  true: "stackable",
  false: ""
};

var reversedClassMap = {
  mobile: "mobile reversed ",
  tablet: "tablet reversed",
  computer: "computer reversed"
};

var attrSchema = {
  columns: {inclusion: {within: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
                        message: "^Invalid column count '%{value}'."}},
  divide: {inclusion: {within: _.keys(divideClassMap),
                       message: "^Invalid value '%{value}'."}},
  cell: {inclusion: {within: _.keys(cellClassMap),
                     message: "^Invalid value '%{value}'."}},
  equalWidth: {inclusion: {within: [true, false],
                           message: "^'%{value}' is not a boolean."}},
  padded: {inclusion: {within: [true, false],
                       message: "^'%{value}' is not a boolean."}},
  relaxed: {inclusion: {within: [true, false],
                        message: "'%{value}' is not a boolean."}},
  centered: {inclusion: {within: [true, false],
                         message: "^'%{value}' is not a boolean."}},
  textAlignment: {inclusion: {within: _.keys(helpers.textlignmentClassMap),
                            message: "^Invalid value '%{value}'."}},
  verticalAlignment: {inclusion: {within: _.keys(helpers.verticalAlignmentClassMap),
                                  message: "^Invalid value '%{value}'."}},
  doubling: {inclusion: {within: [true, false],
                         message: "^'%{value}' is not a boolean."}},
  stackable: {inclusion: {within: [true, false],
                          message: "^'%{value}' is not a boolean."}},
  reverse: {inclusion: {within: _.keys(helpers.reverseClassMap),
                         message: "^Invalid value '%{value}'."}}
};

var grid = {
  controller: function (attrs) {
    var ctrl = {
      attrSchema: attrSchema,
      columnsClassMap: helpers.columnsClassMap,
      divideClassMap: divideClassMap,
      cellClassMap: cellClassMap,
      equalWidthClassMap: equalWidthClassMap,
      paddedClassMap: paddedClassMap,
      relaxedClassMap: relaxedClassMap,
      centeredClassMap: centeredClassMap,
      textAlignmentClassMap: helpers.textAlignmentClassMap,
      verticalAlignmentClassMap: helpers.verticalAlignmentClassMap,
      doublingClassMap: doublingClassMap,
      stackableClassMap: stackableClassMap,
      reverseClassMap: helpers.reverseClassMap,
      getClassList: function (attrs) {
        return ["ui",
                ctrl.columnsClassMap[attrs.columns],
                ctrl.divideClassMap[attrs.divide],
                ctrl.cellClassMap[attrs.cell],
                ctrl.equalWidthClassMap[attrs.equalWidth],
                ctrl.paddedClassMap[attrs.padded],
                ctrl.relaxedClassMap[attrs.relaxed],
                ctrl.centeredClassMap[attrs.centered],
                ctrl.textAlignmentClassMap[attrs.textAlignment],
                ctrl.verticalAlignmentClassMap[attrs.verticalAlignment],
                ctrl.doublingClassMap[attrs.doubling],
                ctrl.stackableClassMap[attrs.stackable],
                ctrl.reverseClassMap[attrs.reverse],
                "grid"];
      }
    };

    return _.assign(new base.controller(attrs), ctrl);
  },
  view: function (c, attrs) {
    c.validateAttrs(attrs);
    return m("div", {class: c.getClass(attrs)}, c.getChildren(attrs));
  }
};

module.exports = grid;
