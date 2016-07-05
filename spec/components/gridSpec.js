var grid = require("./../../components/grid.js");
var m = require("mithril");
var mock = require("../deps/mock.js");
var _ = require("lodash");

describe("components/container", function () {
  describe(".controller", function () {
    it("should be a function", function () {
      expect(_.isFunction(grid.controller)).toEqual(true);
    });

    describe(".getClassList", function () {
      var ctrl;
      beforeEach(function () {
        ctrl = new grid.controller({});
      });

      it("should return list where 'ui' is the first item.", function () {
        expect(ctrl.getClassList({})[0]).toEqual("ui");
      });

      it("should return list where 'container' is the last item.", function () {
        var classList = ctrl.getClassList({});
        expect(classList[classList.length - 1]).toEqual("grid");
      });

      it("should return proper 'columns' class", function () {
        var classList = ctrl.getClassList({columns: 1});
        expect(classList[1]).toEqual(ctrl.columnsClassMap[1]);
      });

      it("should return proper 'divided' class", function () {
        var classList = ctrl.getClassList({divided: "vertically"});
        expect(classList[2]).toEqual(ctrl.dividedClassMap.vertically);
      });

      it("should return proper 'celled' class", function () {
        var classList = ctrl.getClassList({celled: "internally"});
        expect(classList[3]).toEqual(ctrl.celledClassMap.internally);
      });

      it("should return proper 'equalWidth' class", function () {
        var classList = ctrl.getClassList({equalWidth: true});
        expect(classList[4]).toEqual(ctrl.equalWidthClassMap.true);
      });

      it("should return proper 'padded' class", function () {
        var classList = ctrl.getClassList({padded: true});
        expect(classList[5]).toEqual(ctrl.paddedClassMap.true);
      });

      it("should return proper 'relaxed' class", function () {
        var classList = ctrl.getClassList({relaxed: true});
        expect(classList[6]).toEqual(ctrl.relaxedClassMap.true);
      });

      it("should return proper 'centered' class", function () {
        var classList = ctrl.getClassList({centered: true});
        expect(classList[7]).toEqual(ctrl.centeredClassMap.true);
      });

      it("should return proper 'textAligned' class", function () {
        var classList = ctrl.getClassList({textAligned: "right"});
        expect(classList[8]).toEqual(ctrl.textAlignedClassMap.right);
      });

      it("should return proper 'verticalAligned' class", function () {
        var classList = ctrl.getClassList({verticalAligned: true});
        expect(classList[9]).toEqual(ctrl.verticalAlignedClassMap.true);
      });

      it("should return proper 'doubling' class", function () {
        var classList = ctrl.getClassList({doubling: true});
        expect(classList[10]).toEqual(ctrl.doublingClassMap.true);
      });

      it("should return proper 'stackable' class", function () {
        var classList = ctrl.getClassList({stackable: true});
        expect(classList[11]).toEqual(ctrl.stackableClassMap.true);
      });

      it("should return proper 'reversed' class", function () {
        var classList = ctrl.getClassList({reversed: "mobile"});
        expect(classList[12]).toEqual(ctrl.reversedClassMap.mobile);
      });
    });
  });

  describe(".view", function () {
    it("should be a function", function () {
      expect(_.isFunction(grid.view)).toEqual(true);
    });
  });
});
