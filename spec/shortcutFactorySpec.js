var shortcutFactory = require("./../shortcutFactory.js");
var base = require("./../components/base.js");
var _ = require("lodash");

describe("shortcutFactory", function () {
  var shortcut;
  beforeAll(function () {
    shortcut = shortcutFactory(base);
  });

  it("should return a function.", function () {
    expect(_.isFunction(shortcut)).toEqual(true);
  });

  it("should return a function which returns a processed mithril component", function () {
    var vdom = shortcut();
    expect(vdom.view.$original).toBeDefined();
  });
});
