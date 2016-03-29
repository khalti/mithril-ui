var m = require("mithril")
var _ = require("lodash")

// m(Selection, {
//   model: ,
//   items: ,
//   placeholder: ,
//   multiple: ,
// })
module.exports = {
  controller: function (attrs) {
    return {
      getMultipleSelections: function () {
        if (!attrs.multiple || attrs.model() === "") return null

        var selectedItems = _.filter(attrs.items, function (item) {
          return _.some(attrs.model().split(","), function (aSelected) {
            return aSelected == item[1]
          })
        })

        return _.map(selectedItems, function (item) {
          return m("a.ui.label", {"data-value": item[1]}, item[0], m("i.delete.icon"))
        })
      },
      getSingleSelection: function () {
        if (!attrs.multiple && attrs.model() !== "") {
          return _.find(attrs.items, function (item) { return item[1] == attrs.model()})
        }
        else {
          return attrs.placeholder
        }
      },
      getMenu: function () {
        return m(".menu",
          _.map(attrs.items, function (item) {
            return m(".item", {"data-value": item[1]},
              item[0])
          }))
      }
    }
  },

  view: function (ctrl, attrs) {
    return m(".ui.fluid.search.selection.dropdown", {class: attrs.multiple? "multiple": ""},
      m("i.dropdown.icon"),
      ctrl.getMultipleSelections(),
      m("input.search[autocomplete=off][tabindex=0]"),
      m(".text", {class: attrs.model.isDirty()? "": "default"}, ctrl.getSingleSelection()),
      ctrl.getMenu())
  }
}
