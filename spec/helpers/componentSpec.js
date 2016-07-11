var component = require("./../../helpers/component.js");
var _ = require("lodash");

var noop = function () {};

describe("helpers/component.js", function () {
  it("should be a function", function () {
    expect(_.isFunction(component)).toEqual(true);
  });

  it("should complain if non object argument is passed.", function () {
    expect(component.bind(component)).toThrowError(Error);
  });

  it("should complain if view is absent", function () {
    expect(component.bind(component, {})).toThrowError(Error);
  });

  it("should return a function", function () {
    var aCom = component({view: function () {}});
    expect(_.isFunction(aCom)).toEqual(true);
  });

  it("should attach the view to the returned function", function () {
    var base = {
      view: function () {
        return "baseView";
      }
    };
    var aCom = component({extend: base});

    expect(aCom.view()).toEqual("baseView");
  });

  it("should attach the controller to the returned function", function () {
    var base = {
      view: noop,
      controller: function () {
        return {one: 1};
      }
    };
    var ctrl = component({extend: base}).controller();
    delete ctrl.base;

    expect(ctrl).toEqual({one: 1});
  });

  it("should merge the controllers", function () {
    var base = {
      view: noop,
      controller: function () {
        return {one: 1};
      }
    };
    var struct = {
      extend: base,
      controller: function () {
        return {two: 2};
      }
    };
    var ctrl = component(struct).controller();
    delete ctrl.base;

    expect(ctrl).toEqual({one: 1, two: 2});
  });

  it("should override the base's controller props.", function () {
    var base = {
      view: noop,
      controller: function () {
        return {one: 1};
      }
    };
    var struct = {
      extend: base,
      controller: function () {
        return {one: "chagu"};
      }
    };
    var ctrl = component(struct).controller();
    delete ctrl.base;

    expect(ctrl).toEqual({one: "chagu"});
  });

  it("should attach the base to new component's controller", function () {
    var base = {
      controller: function () {
        return {one: 1};
      }
    };
    var struct = {
      extend: base,
      view: noop
    };
    var aCom = component(struct);

    expect(aCom.controller().base).toEqual({one: 1});
  });

  it("should override the base's view", function () {
    var base = {
      view: function () {
        return "baseView";
      }
    };
    var struct = {
      extend: base,
      view: function () {
        return "structView";
      }
    };
    var aCom = component(struct);

    expect(aCom.view()).toEqual("structView");
  });

  it("should use the base's view if not overriden", function () {
    var base = {
      view: function () {
        return "baseView";
      }
    };
    var struct = {
      extend: base
    };
    var aCom = component(struct);

    expect(aCom.view()).toEqual("baseView");
  });

  it("should return a function which returns the processed component.", function () {
    var struct = {
      view: function () {
        return "view";
      }
    };
    var aCom = component(struct);

    expect(aCom().view.$original()).toEqual("view");
  });
});
