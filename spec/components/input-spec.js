var Input = require("../../components/input.js")
var m = require('mithril')
var mock = require("../deps/mock.js")

describe("Input", function () {
  var attrs = {
    prepend: 'aPrepend',
    append: 'aAppend',
    onclick: 'aCallabck',
    type: 'hidden'
  }

  var aCtrl = new Input.controller(attrs)
  var aView = Input.view(aCtrl, attrs)

  it("it appends", function () {
    expect(aView.children[0]).toEqual(attrs.prepend)
  })

  it("it prepends", function () {
    expect(aView.children[2]).toEqual(attrs.append)
  })

  it("it sets root's class", function () {
    expect(aView.attrs.class).toEqual(".ui.right.labeled.input")
  })

  it("passes rest of the attributes to input element", function () {
    var inputAttrs = aView.children[1].attrs;
    expect(inputAttrs).toEqual({onclick: attrs.onclick, type: 'hidden', class: 'hidden'});
  });

  it("changes class of <input> element to 'hidden' if 'attrs.type' is 'hidden'", function () {
    var inputAttrs = aView.children[1].attrs;
    expect(inputAttrs.class).toEqual(attrs.type);
  });

  describe("Input.controller.getClass()", function () {
    var ctrl
    beforeEach(function () {
      ctrl = new Input.controller()
    })

    it("returns '.ui.input' if there is nothing to prepend or append", function () {
      var attrs = {}
      expect(ctrl.getClass(attrs)).toEqual(".ui.input")
    })

    it("returns '.ui.icon.input' if an icon is being appended", function () {
      var attrs = {append: m("i")}
      expect(ctrl.getClass(attrs)).toEqual(".ui.icon.input")
    })

    it("returns '.ui.left.icon.input' if an icon is being prepended", function () {
      var attrs = {prepend: m("i")}
      expect(ctrl.getClass(attrs)).toEqual(".ui.left.icon.input")
    })

    it("returns '.ui.labeled.input' if a label is being prepended", function () {
      var attrs = {prepend: m("div")}
      expect(ctrl.getClass(attrs)).toEqual(".ui.labeled.input")
    })

    it("returns '.ui.right.labeled.input' if a label is being appended", function () {
      var attrs = {append: m("div")}
      expect(ctrl.getClass(attrs)).toEqual(".ui.right.labeled.input")
    })

    it("returns '.ui.labeled.icon.input' if a label is being prepended and icon is being appended", function () {
      var attrs = {prepend: m("div"), append: m("i")}
      expect(ctrl.getClass(attrs)).toEqual(".ui.labeled.icon.input")
    })

    it("returns '.ui.left.icon.right.labeled.input' if an icon is being prepended and a label is being appended", function () {
      var attrs = {prepend: m("i"), append: m("div")}
      expect(ctrl.getClass(attrs)).toEqual(".ui.left.icon.right.labeled.input")
    })
  })
});