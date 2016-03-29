var Selection = require("../../components/selection.js")
var m = require("mithril")
var mock = require("../deps/mock.js")
var Form =  require("mithril-form")

describe("selection", function () {

  beforeEach(function () {
    this.model = Form({element: {presence: true}}).element
    this.root = mock.document.createElement("div")
    m.deps(mock.window)
    this.attrs = {
      model: this.model,
      placeholder: "Country"
    }
  })

  it("won't append 'multiple' to the class of root div", function () {
    mock.requestAnimationFrame.$resolve()

    var aSelection = m.component(Selection, this.attrs)
    m.mount(this.root, aSelection)

    expect(this.root.childNodes[0].class).not.toMatch('multiple')
  })

  it("appends 'multiple' to the class of root div", function () {
    mock.requestAnimationFrame.$resolve()

    this.attrs.multiple = true
    var aSelection = m.component(Selection, this.attrs)
    m.mount(this.root, aSelection)

    expect(this.root.childNodes[0].class).toMatch('multiple')
  })

  it("associates the items with their value", function () {
    mock.requestAnimationFrame.$resolve()

    this.attrs.items = [["Hydrogen", 1], ["Helium", 2], ["Lithium", 3]]

    var aSelection = m.component(Selection, this.attrs)
    m.mount(this.root, aSelection)

    var firstItem = this.root.childNodes[0].childNodes[4].childNodes[0]
    expect(firstItem.childNodes[0].nodeValue).toEqual(this.attrs.items[0][0])
    expect(parseInt(firstItem["data-value"])).toEqual(this.attrs.items[0][1])
  })

  it("displays placeholder if no item is selected", function () {
    mock.requestAnimationFrame.$resolve()

    this.attrs.items = [["Hydrogen", 1], ["Helium", 2], ["Lithium", 3]]

    var aSelection = m.component(Selection, this.attrs)
    m.mount(this.root, aSelection)

    var selected = this.root.childNodes[0].childNodes[3]
    expect(selected.childNodes[0].nodeValue).toEqual(this.attrs.placeholder)
  })

  it("displays the selected alias instead of placeholder", function () {
    mock.requestAnimationFrame.$resolve()

    this.attrs.items = [["Hydrogen", 1], ["Helium", 2], ["Lithium", 3]]
    this.model(2)

    var aSelection = m.component(Selection, this.attrs)
    m.mount(this.root, aSelection)

    var selected = this.root.childNodes[0].childNodes[3]
    expect(selected.childNodes[0].nodeValue).toEqual("Helium")
  })

  it("displays the selected items in multiple selection", function () {
    mock.requestAnimationFrame.$resolve()

    this.attrs.multiple = true
    this.attrs.items = [["Hydrogen", 1], ["Helium", 2], ["Lithium", 3]]
    this.model('1,2')

    var aSelection = m.component(Selection, this.attrs)
    m.mount(this.root, aSelection)

    var selected1 = this.root.childNodes[0].childNodes[1]
    expect(selected1["data-value"]).toEqual("1")
    expect(selected1.childNodes[0].nodeValue).toEqual("Hydrogen")

    var selected2 = this.root.childNodes[0].childNodes[2]
    expect(selected2["data-value"]).toEqual("2")
    expect(selected2.childNodes[0].nodeValue).toEqual("Helium")
  })

  xit("updates model on clicking an item", function () {
    fail("todo")
  })

  xit("updates model on removing a selected item", function () {
    fail("todo")
  })

  xit("it updates item list upon search", function () {
    fail("todo")
  })

  xit("allows icons in selection items", function () {
    fail("todo")
  })
})