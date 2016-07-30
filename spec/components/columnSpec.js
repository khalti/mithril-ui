import {column} from "./../../src/components/column.js";
import m from "mithril";
var mock = require("../deps/mock.js");
var _ = require("lodash");

describe("components/column", function () {
  describe(".controller", function () {
    it("should be a function", function () {
      expect(_.isFunction(column.controller)).toEqual(true);
    });

    describe(".getClassList", function () {
      var ctrl;
      beforeEach(function () {
        ctrl = new column.controller({});
      });

      it("should return list where 'container' is the last item.", function () {
        var classList = ctrl.getClassList({});
        expect(classList[classList.length - 1]).toEqual("column");
      });

      it("should return proper 'float' class", function () {
        var classList = ctrl.getClassList({float: "left"});
        expect(classList[0]).toEqual(ctrl.floatClassMap.left);
      });

      it("should return proper 'width' class", function () {
        var classList = ctrl.getClassList({width: 8});
        expect(classList[1]).toEqual(ctrl.widthClassMap[8]);
      });

      it("should return proper 'color' class", function () {
        var classList = ctrl.getClassList({color: "blue"});
        expect(classList[2]).toEqual(ctrl.colorClassMap.blue);
      });

      it("should return proper 'textAlignment' class", function () {
        var classList = ctrl.getClassList({textAlignment: "center"});
        expect(classList[3]).toEqual(ctrl.textAlignmentClassMap.center);
      });

      it("should return proper 'visible' class", function () {
        var classList = ctrl.getClassList({visible: "mobile"});
        expect(classList[4]).toEqual(ctrl.visibleClassMap.mobile);
      });

      it("should return proper 'mobile' class", function () {
        var classList = ctrl.getClassList({mobile: 8});
        expect(classList[5]).toEqual(ctrl.widthClassMap[8] + " mobile");
      });

      it("should return proper 'tablet' class", function () {
        var classList = ctrl.getClassList({tablet: 8});
        expect(classList[6]).toEqual(ctrl.widthClassMap[8] + " tablet");
      });

      it("should return proper 'computer' class", function () {
        var classList = ctrl.getClassList({computer: 8});
        expect(classList[7]).toEqual(ctrl.widthClassMap[8] + " computer");
      });

      it("should return proper 'largeScreen' class", function () {
        var classList = ctrl.getClassList({largeScreen: 8});
        expect(classList[8]).toEqual(ctrl.widthClassMap[8] + " large screen");
      });

      it("should return proper 'widescreen' class", function () {
        var classList = ctrl.getClassList({widescreen: 8});
        expect(classList[9]).toEqual(ctrl.widthClassMap[8] + " widescreen");
      });
    });
  });

  describe(".view", function () {
    it("should be a function", function () {
      expect(_.isFunction(column.view)).toEqual(true);
    });
  });
});
