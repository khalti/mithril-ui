var m = require("mithril");
var base = require("./base.js");
var _ = require("lodash");

var columnsClassMap = {
  1: "one column",
  2: "two column",
  3: "three column",
  4: "four column",
  5: "five column",
  6: "six column",
  7: "seven column",
  8: "eight column",
  9: "nine column",
  10: "ten column",
  11: "eleven column",
  12: "twelve column",
  13: "thirteen column",
  14: "fourteen column",
  15: "fifteen column",
  16: "sixteen column"
};

var dividedClassMap = {
  "horizontally": "divided",
  "vertically": "vertically divided"
};

var celledClassMap = {
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

var textAlignedClassMap = {
  left: "",
  right: "right aligned",
  center: "center aligned",
  justified: "justified"
};

var verticalAlignedClassMap = {
  true: "middle aligned",
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
  divided: {inclusion: {within: _.keys(dividedClassMap),
                        message: "^Invalid value '%{value}'."}},
  celled: {inclusion: {within: _.keys(celledClassMap),
                       message: "^Invalid value '%{value}'."}},
  equalWidth: {inclusion: {within: [true, false],
                           message: "'%{value}' is not a boolean."}},
  padded: {inclusion: {within: [true, false],
                       message: "'%{value}' is not a boolean."}},
  relaxed: {inclusion: {within: [true, false],
                        message: "'%{value}' is not a boolean."}},
  centered: {inclusion: {within: [true, false],
                         message: "'%{value}' is not a boolean."}},
  textAligned: {inclusion: {within: _.keys(textAlignedClassMap),
                            message: "^Invalid value '%{value}'."}},
  verticalAligned: {inclusion: {within: [true, false],
                                message: "'%{value}' is not a boolean."}},
  doubling: {inclusion: {within: [true, false],
                         message: "'%{value}' is not a boolean."}},
  stackable: {inclusion: {within: [true, false],
                          message: "'%{value}' is not a boolean."}},
  reversed: {inclusion: {within: _.keys(reversedClassMap),
                         message: "^Invalid value '%{value}'."}}
};

var grid = {
  controller: function (attrs) {
    var ctrl = {
      attrSchema: attrSchema,
      columnsClassMap: columnsClassMap,
      dividedClassMap: dividedClassMap,
      celledClassMap: celledClassMap,
      equalWidthClassMap: equalWidthClassMap,
      paddedClassMap: paddedClassMap,
      relaxedClassMap: relaxedClassMap,
      centeredClassMap: centeredClassMap,
      textAlignedClassMap: textAlignedClassMap,
      verticalAlignedClassMap: verticalAlignedClassMap,
      doublingClassMap: doublingClassMap,
      stackableClassMap: stackableClassMap,
      reversedClassMap: reversedClassMap,
      getClassList: function (attrs) {
        return ["ui",
                ctrl.columnsClassMap[attrs.columns],
                ctrl.dividedClassMap[attrs.divided],
                ctrl.celledClassMap[attrs.celled],
                ctrl.equalWidthClassMap[attrs.equalWidth],
                ctrl.paddedClassMap[attrs.padded],
                ctrl.relaxedClassMap[attrs.relaxed],
                ctrl.centeredClassMap[attrs.centered],
                ctrl.textAlignedClassMap[attrs.textAligned],
                ctrl.verticalAlignedClassMap[attrs.verticalAligned],
                ctrl.doublingClassMap[attrs.doubling],
                ctrl.stackableClassMap[attrs.stackable],
                ctrl.reversedClassMap[attrs.reversed],
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
