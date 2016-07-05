var base = require("./../../components/base.js");
var m = require("mithril");
var mock = require("../deps/mock.js");
var _ = require("lodash");

describe("components/base", function () {
  var attrs, root, aModel;

  beforeEach(function () {
    root = mock.document.createElement("div");
    m.deps(mock.window);
  });

  describe(".view", function () {
    // TODO: test against the dom instead of mocks
    var fakeController;
    beforeAll(function () {
      fakeController = {
        validateAttrs: "",
        getAttrs: "",
        getChildren: "",
        getFinalAttrs: ""
      };
      spyOn(fakeController, "validateAttrs");
      spyOn(fakeController, "getAttrs");
      spyOn(fakeController, "getChildren");
      spyOn(fakeController, "getFinalAttrs");

      base.view(fakeController);
    });

    it("should be a function", function () {
      expect(_.isFunction(base.view)).toEqual(true);
    });

    it("should validate attributes", function () {
      expect(fakeController.validateAttrs).toHaveBeenCalled();
    });

    it("should set attributes", function () {
      expect(fakeController.getAttrs).toHaveBeenCalled();
    });

    it("should set children", function () {
      expect(fakeController.getChildren).toHaveBeenCalled();
    });
  });

  describe(".controller", function () {
    var ctrl, attrs, schema;
    beforeEach(function () {
      var alignmentClassMap = {
        "left": "left aligned",
        "right": "right aligned"
      };
      var fluidClassMap = {
        true: "fluid",
        false: ""
      };

      schema = {
        alignment: {presence: true},
        fluid: {presence: true}
      };

      ctrl = new base.controller();
      attrs = {"alignment": "left", "fluid": true};
      ctrl.attrSchema = schema;
      ctrl.getClassList = function (attrs) {
        return [alignmentClassMap[attrs.alignment], fluidClassMap[attrs.fluid]];
      };
    });

    it("should be a function", function () {
      expect(_.isFunction(base.controller)).toEqual(true);
    });

    it("should return an object", function () {
      expect(_.isObject(base.controller())).toEqual(true);
    });

    describe(".getClassList", function () {
      it("should return a list", function () {
        expect(_.isArray(ctrl.getClassList(attrs))).toEqual(true);
      });
    });

    describe(".filterClassList", function () {
      it("should exclude undefined values", function () {
        attrs.fluid = "invalid value";
        expect(ctrl.filterClassList(ctrl.getClassList(attrs))).toEqual(["left aligned"]);
      });
    });

    describe(".getClass", function () {
      it("should return a class from attributes", function () {
        expect(ctrl.getClass(attrs)).toEqual("left aligned fluid");
      });
    });

    describe(".validateAttrs", function () {
      it("should return undefined if no schema if passed", function () {
        expect(ctrl.validateAttrs({})).not.toBeDefined();
      });

      it("should raise expection if attributes are invalid", function () {
        expect(ctrl.validateAttrs.bind(ctrl, {}, schema)).toThrowError(Error);
      });
    });

    describe(".argsToList", function () {
      it("should convert arguments to list", function () {
        var args;
        (function (a, b, c) { args = arguments;})(1,2,3);
        expect(ctrl.argsToList(args)).toEqual([1,2,3]);
      });
    });

    describe(".getChildren", function () {
      it("should exclude first two items from arguments if valid attribute is present at index 1.", function () {
        var args;
        (function () {args = arguments;})("controller", {}, "child1", "child2");
        expect(ctrl.getChildren(args)).toEqual(["child1", "child2"]);
      });

      it("should exclude first item if valid attribute is absent at index 1", function () {
        var args;
        (function () {args = arguments;})("controller", "child1", "child2");
        expect(ctrl.getChildren(args)).toEqual(["child1", "child2"]);
      });

      it("should return empty list if arguments length < 2", function () {
        var args;
        (function () {args = arguments;})(1);
        expect(ctrl.getChildren(args)).toEqual([]);
      });
    });

    describe(".hasAttrs", function () {
      it("should return false if arguments length is < 2", function () {
        var args;
        (function () {args = arguments;})(1);
        expect(ctrl.hasAttrs(args)).toEqual(false);
      });

      it("should return true if argument at index 1 is valid attribute.", function () {
        var args;
        (function () {args = arguments;})("controller", {}, "children");
        expect(ctrl.hasAttrs(args)).toEqual(true);
      });

      it("should return false if argument at index 1 is invalid attribute.", function () {
        var args;
        (function () {args = arguments;})("controller", "children");
        expect(ctrl.hasAttrs(args)).toEqual(false);
      });
    });

    describe(".getAttrs", function () {
      it("should return {} if arguments length is < 2.", function () {
        var args;
        (function () {args = arguments;})(1);
        expect(ctrl.getAttrs(args)).toEqual({});
      });

      it("should return {} if valid attribute if absent.", function () {
        var args;
        (function () {args = arguments;})("controller", "children");
        expect(ctrl.getAttrs(args)).toEqual({});
      });

      it("should return the attribute.", function () {
        var args;
        (function () {args = arguments;})("controller", {key: "val"}, "children");
        expect(ctrl.getAttrs(args)).toEqual({key: "val"});
      });
    });

    describe(".getFinalAttrs", function () {
      it("should append user supplied class", function () {
        attrs.class = "myclass";
        expect(ctrl.getFinalAttrs(attrs).class).toEqual("left aligned fluid myclass");
      });

      it("should remove keys which are common to attribute-schema and attributes passed by user", function () {
        attrs["data-name"] = "aName";
        expect(ctrl.getFinalAttrs(attrs)).toEqual({"data-name": "aName"});
      });
    });
  });
});
