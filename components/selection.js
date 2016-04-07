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
      updateModel: function (value) {
        if (attrs.multiple) {
          attrs.model() == ""? attrs.model(value): attrs.model(attrs.model() + "," + value)
        }
        else {
          attrs.model(value)
        }
      },
      disSelect: function (value) {
        console.log(arguments)
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
          return _.find(attrs.items, function (item) { return item[1] == attrs.model()})[0]
        }
        else {
          return attrs.placeholder
        }
      },
      getMenu: function () {
        var self = this
        var disSelectedItems
        if (attrs.multiple) {
          disSelectedItems = _.difference(attrs.items, this.getSelectedItems())
        }
        else {
          disSelectedItems = attrs.items
        }
        return m(".menu", {class: this.menuVisible? "transition visible": ""},
          _.map(disSelectedItems , function (item) {
            return m(".item", {"data-value": item[1], onclick: m.withAttr('data-value', self.updateModel)},
              item[0])
          }))
      },
      menuVisible: false,
      toggleMenu: function () {
        this.menuVisible = !this.menuVisible
      },
      getClass: function () {
        var cls = "";
        if (attrs.multiple) {
          cls += "multiple"
        }
        else if (this.menuVisible) {
          cls += " active visible"
        }
        return cls
      }
    }
  },

  view: function (ctrl, attrs) {
    return m(".ui.fluid.search.selection.dropdown",
      {
        class: ctrl.getClass(),
        onclick: ctrl.toggleMenu.bind(ctrl)
      },
      m("i.dropdown.icon"),
      ctrl.getMultipleSelections(),
      m("input.search[autocomplete=off][tabindex=0]"),
      m(".text", {class: attrs.model.isDirty()? "": "default"}, ctrl.getSingleSelection()),
      ctrl.getMenu())
  }
}
