var m = require("mithril");
var base = require("./base.js");

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
    var ctrl = new container.controller(attrs);
    ctrl.attrSchema = attrSchema;

    ctrl.getClassList = function (attrs) {
      var classList = ["ui",
                       this.mapClass(columnsClassMap, attrs.columns),
                       this.mapClass(dividedClassMap, attrs.divided),
                       this.mapClass(celledClassMap, attrs.celled),
                       this.mapClass(equalWidthClassMap, attrs.equalWidth),
                       this.mapClass(paddedClassMap, attrs.padded),
                       this.mapClass(relaxedClassMap, attrs.relaxed),
                       this.mapClass(centeredClassMap, attrs.centered),
                       this.mapClass(textAlignedClassMap, attrs.textAligned),
                       this.mapClass(verticalAlignedClassMap, attrs.verticalAligned),
                       this.mapClass(doublingClassMap, attrs.doubling),
                       this.mapClass(stackableClassMap, attrs.stackable),
                       this.mapClass(reversedClassMap, attrs.reversed),
                       "grid"];
      return classList;
    };

    return ctrl;
  },
  view: function (c, attrs) {
    c.validateAttrs(attrs);
    return m("div", {class: c.getClass(attrs)}, c.getChildren(attrs));
  }
};

module.exports = grid;
