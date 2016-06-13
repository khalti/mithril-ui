var selection = require("../../components/select.js");
var m = require('mithril');
var mock = require("../deps/mock.js");
var form = require("mithril-form");

describe("selection", function () {
  var attrs, root, model, superheroes;

  beforeEach(function () {
    superheroes = [{value: "", label: "Select superheroes"},
                   {value: 1, label: "Batman", icon: "aicon"},
                   {value: 2, label: "Superman", icon: "aicon"},
                   {value: 3, label: "flash", icon: "aicon"}];
    model = form({superhero: {presence: true}}).superhero;
    attrs = {
      label: "Superheroes",
      model: model,
      options: superheroes
    };
    root = mock.document.createElement("div");
    m.deps(mock.window);
  });

  it("lists options", function () {
    var view = selection.view(new selection.controller(attrs), attrs);
    var item1 = view.children[1].children[0];

    expect(item1.attrs.value).toEqual("");
    expect(item1.children[0]).toEqual("Select superheroes");
  });

  it("shows errors", function () {
    attrs.model.isValid();
    var view = selection.view(new selection.controller(attrs), attrs);
    var error = view.children[2];

    expect(error.children[0]).toEqual("Superhero can\'t be blank");
  });

  it("gets red colored if error exists in its model", function () {
    attrs.model.isValid();
    var view = selection.view(new selection.controller(attrs), attrs);

    expect(view.attrs.class || view.attrs.className).toEqual("field error");
  });
});
