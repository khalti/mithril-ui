var factory = require("./../helpers/factory.js");
var _ = require("lodash");

var noop = function() {};

describe("factory", function () {
  var noopComponent;

  beforeEach(function () {
    noopComponent = {controller: noop, view: noop};
  });

  it("should be a function", function () {
    expect(_.isFunction(factory)).toEqual(true);
  });

  it("should complain if base component is invalid.", function () {
    var invalidController = {controller: "jpt"};
    var invalidView = {view: "jpt"};

    expect(factory.bind(factory, invalidController, noopComponent)).toThrowError(Error);
    expect(factory.bind(factory, invalidView, noopComponent)).toThrowError(Error);
  });

  it("should complain if mixin component is invalid.", function () {
    var invalidController = {controller: "jpt"};
    var invalidView = {view: "jpt"};

    expect(factory.bind(factory, noopComponent, invalidController)).toThrowError(Error);
    expect(factory.bind(factory, noopComponent, invalidView)).toThrowError(Error);
  });

  it("should override base's view with mixin's view.", function () {
    var base = {view: function() {return "baseView";}};
    var mixin = {view: function() {return "mixinView";}};

    var newComponent = factory(base, mixin);
    expect(newComponent.view()).toEqual("mixinView");
  });

  it("should use base component's view if sub compoent's view is absent.", function () {
    var base = {view: function() {return "baseView";}};
    var mixin = {};

    var newComponent = factory(base, mixin);
    expect(newComponent.view()).toEqual("baseView");
  });

  it("should merge sub component's controller with base component's controller.", function () {
    var base = {controller: function () {
      return {one: 1};
    }};
    var mixin  = {controller: function () {
      return {two: 2};
    }};

    var newComponent = factory(base, mixin);
    expect(newComponent.controller().one).toEqual(1);
    expect(newComponent.controller().two).toEqual(2);
  });

  it("should override base component's controller property.", function () {
    var base = {controller: function () {
      return {one: 1};
    }};
    var mixin  = {controller: function () {
      return {one: 2};
    }};

    var newComponent = factory(base, mixin);
    expect(newComponent.controller().one).toEqual(2);
  });
});
