var row = require("./../../components/row.js");
var m = require("mithril");
var mock = require("../deps/mock.js");
var _ = require("lodash");

describe("components/row", function () {
  describe(".controller", function () {
    it("should be a function", function () {
      expect(_.isFunction(row.controller)).toEqual(true);
    });

    describe(".getClassList", function () {
      var ctrl;
      beforeEach(function () {
        ctrl = new row.controller({});
      });

      it("should return list where 'container' is the last item.", function () {
        var classList = ctrl.getClassList({});
        expect(classList[classList.length - 1]).toEqual("row");
      });

      it("should return proper 'columns' class", function () {
        var classList = ctrl.getClassList({columns: 1});
        expect(classList[0]).toEqual(ctrl.columnsClassMap[1]);
      });

      it("should return proper 'stretched' class", function () {
        var classList = ctrl.getClassList({stretched: true});
        expect(classList[1]).toEqual(ctrl.stretchedClassMap.true);
      });

      it("should return proper 'color' class", function () {
        var classList = ctrl.getClassList({color: "blue"});
        expect(classList[2]).toEqual(ctrl.colorClassMap.blue);
      });

      it("should return proper 'textAlignment' class", function () {
        var classList = ctrl.getClassList({textAlignment: "center"});
        expect(classList[3]).toEqual(ctrl.textAlignmentClassMap.center);
      });

      it("should return proper 'verticalAlignment' class", function () {
        var classList = ctrl.getClassList({verticalAlignment: "bottom"});
        expect(classList[4]).toEqual(ctrl.verticalAlignmentClassMap.bottom);
      });

      it("should return proper 'visible' class", function () {
        var classList = ctrl.getClassList({visible: "mobile"});
        expect(classList[5]).toEqual(ctrl.visibleClassMap.mobile);
      });
    });
  });

  describe(".view", function () {
    it("should be a function", function () {
      expect(_.isFunction(row.view)).toEqual(true);
    });
  });
});
