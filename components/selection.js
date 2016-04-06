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
      disSelect: function (value) {
        attrs.model(_.difference(attrs.model().split(","), [value]).join(","))
      },
      getSelectedItems: function () {
        if (attrs.model() === "" || attrs.model() === undefined) {
          return selectedItems = []
        }
        else if (attrs.model().indexOf(',') == -1) {
          return selectedItems = [_.find(attrs.items, function (item) {
            return item[1] === parseInt(attrs.model())
          })]
        }
        else {
          return selectedItems = _.filter(attrs.items, function (item) {
            return _.some(attrs.model().split(","), function (aSelected) {
              return aSelected == item[1]
            })
          })
        }
      },
      getMultipleSelections: function () {
        var self = this
        if (!attrs.multiple || attrs.model() === "") return null

        var selectedItems = self.getSelectedItems()

        return _.map(selectedItems, function (item) {
          return m("a.ui.label", {"data-value": item[1]},
            item[0],
            m("i.delete.icon", {"data-value": item[1], onclick: m.withAttr("data-value", self.disSelect.bind(self))}))
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
        var disSelectedItems;
        if (attrs.multiple) {
          disSelectedItems = _.difference(attrs.items, this.getSelectedItems())
        }
        else {
          disSelectedItems = attrs.items
        }
        return m(".menu",
          _.map(disSelectedItems , function (item) {
            return m(".item", {"data-value": item[1], onclick: m.withAttr('data-value', attrs.model)},
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
