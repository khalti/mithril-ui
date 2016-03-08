var Input = require("../../components/input.js")
var m = require('mithril')
var mock = require("../deps/mock.js")

describe('components/input', function () {
  var attrs = {
    class: 'aClass',
    prepend: 'aPrepend',
    append: 'aAppend',
    onclick: 'aCallabck',
    type: 'hidden'}

  var aInput = m.component(Input, attrs);
  var aView = aInput.view();

  it("sets class of root 'div' to 'attrs.class'", function () {
    expect(aView.attrs.class).toEqual(attrs.class);
  });

  it("prepends 'attrs.prepend' before input element", function () {
    expect(aView.children[0]).toEqual(attrs.prepend);
  });

  it("appends 'attrs.append' after input element", function () {
    expect(aView.children[2]).toEqual(attrs.append);
  });

  it("passes rest of the attributes to input element", function () {
    var inputAttrs = aView.children[1].attrs;
    expect(inputAttrs).toEqual({onclick: attrs.onclick, type: 'hidden', class: 'hidden'});
  });

  it("changes class of <input> element to 'hidden' if 'attrs.type' is 'hidden'", function () {
    var inputAttrs = aView.children[1].attrs;
    expect(inputAttrs.class).toEqual(attrs.type);
  });
});