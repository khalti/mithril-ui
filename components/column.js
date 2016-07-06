var base = require("./base.js");
var _ = require("lodash");
var helpers = require("./../helpers.js");
var factory = require("./../factory.js");

var floatClassMap = {
  "left": "left floated",
  "right": "right floated"
};

var properKeys = function (obj) {
  return _.map(_.keys(obj), function (akey) {
    var properKey = parseInt(akey);
    if(properKey) {
      return properKey;
    }
    else {
      return akey;
    }
  });
};

var component = {
  controller: function (attrs) {
    return {
      classAppend: undefined,
      attrSchema: {
        float: {inclusion: {within: _.keys(floatClassMap),
                            message: "^Invalid value '%{value}'."}},
        width: {inclusion: {within: properKeys(helpers.widthClassMap),
                           message: "^Invalid value '%{value}'."}},
        color: {inclusion: {within: _.keys(helpers.colorClassMap),
                            message: "^Invalid value '%{value}'."}},
        textAlignment: {inclusion: {within: _.keys(helpers.textAlignmentClassMap),
                                    message: "^Invalid value '%{value}'."}},
        visible: {inclusion: {within: _.keys(helpers.visibleClassMap),
                              message: "^Invalid value '%{value}'."}},
        mobile: {inclusion: {within: properKeys(helpers.widthClassMap),
                             message: "^Invalid value '%{value}'."}},
        tablet: {inclusion: {within: properKeys(helpers.widthClassMap),
                             message: "^Invalid value '%{value}'."}},
        computer: {inclusion: {within: properKeys(helpers.widthClassMap),
                               message: "^Invalid value '%{value}'."}},
        largeScreen: {inclusion: {within: properKeys(helpers.widthClassMap),
                                  message: "^Invalid value '%{value}'."}},
        widescreen: {inclusion: {within: properKeys(helpers.widthClassMap),
                                 message: "^Invalid value '%{value}'."}}
      },
      floatClassMap: floatClassMap,
      widthClassMap: helpers.widthClassMap,
      colorClassMap: helpers.colorClassMap,
      textAlignmentClassMap: helpers.textAlignmentClassMap,
      visibleClassMap: helpers.visibleClassMap,
      getClassList: function (attrs) {
        return [this.floatClassMap[attrs.float],
                this.widthClassMap[attrs.width],
                this.colorClassMap[attrs.color],
                this.textAlignmentClassMap[attrs.textAlignment],
                this.visibleClassMap[attrs.visible],
                attrs.mobile? this.widthClassMap[attrs.mobile] + " mobile": "",
                attrs.tablet? this.widthClassMap[attrs.tablet] + " tablet": "",
                attrs.computer? this.widthClassMap[attrs.computer] + " computer": "",
                attrs.largeScreen? this.widthClassMap[attrs.largeScreen] + " large screen": "",
                attrs.widescreen? this.widthClassMap[attrs.widescreen] + " widescreen": "",
                "column"];
      }
    };
  }
};

module.exports =  factory(base, component);
