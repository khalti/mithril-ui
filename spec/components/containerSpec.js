var container = require("./../../components/container.js");
var m = require("mithril");
var mock = require("../deps/mock.js");
var _ = require("lodash");

describe("components/container", function () {
  describe(".controller", function () {
    it("should be a function", function () {
      expect(_.isFunction(container.controller)).toEqual(true);
    });

    describe(".getClassList", function () {
      var ctrl;
      beforeEach(function () {
        ctrl = new container.controller({});
      });

      it("should return list where 'ui' is the first item.", function () {
        expect(ctrl.getClassList({})[0]).toEqual("ui");
      });

      it("should return list where 'container' is the last item.", function () {
        var classList = ctrl.getClassList({});
        expect(classList[classList.length - 1]).toEqual("container");
      });

      it("should return proper type class", function () {
        var classList = ctrl.getClassList({type: "text"});
        expect(classList[1]).toEqual(ctrl.typeClassMap.text);
      });

      it("should return proper alignment class", function () {
        var classList = ctrl.getClassList({alignment: "center"});
        expect(classList[2]).toEqual(ctrl.alignmentClassMap.center);
      });
    });
  });

  describe(".view", function () {
    it("should be a function", function () {
      expect(_.isFunction(container.view)).toEqual(true);
    });
  });
});
