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
      search: m.prop(""),
      updateModel: function (e) {
        var value = e.currentTarget.getAttribute("data-value")

        if (attrs.multiple) {
          attrs.model() == ""? attrs.model(value): attrs.model(attrs.model() + "," + value)
        }
        else {
          e.stopPropagation()
          attrs.model(value)
          this.hideMenu()
        }

        this.search("")
      },
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
          return m("a.ui.label",
            {
              "data-value": item[1],
              onclick: function (e) {e.stopPropagation()}
            },
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
        var leftOver
        if (attrs.multiple) {
          leftOver = _.difference(attrs.items, this.getSelectedItems())
        }
        else {
          leftOver = attrs.items
        }

        var filtered = _.filter(leftOver, function (item) {
          return item[0].toLowerCase().search(self.search()) === 0
        })

        function getItems(data) {
          function getClass() {

          }

          var items = _.map(data, function (item) {
            return m(".item",
              {
                "data-value": item[1],
                onclick: self.updateModel.bind(self),
                class: getClass()
              },
              item[0])
          })

          if(items.length == 0) {
            return m(".message", "No results found.")
          }
          else {
            return items
          }
        }

        return m(".menu",
          {
            class: this.menuVisible? "transition visible": "",
            onclick: function (e) {
              attrs.multiple? e.stopPropagation(): ""}
          },
          getItems(filtered))
      },
      menuVisible: false,
      hideMenu: function () {
        this.menuVisible = false
      },
      showMenu: function (e) {
        e.stopPropagation()
        this.menuVisible = true
        this.input.focus()
      },
      getClass: function () {
        var cls = "";
        if (attrs.multiple) {
          cls += "multiple"
        }
        if (this.menuVisible) {
          cls += " active visible"
        }
        return cls
      },
      configInput: function (el, initialized, ctx) {
        if (!initialized) {
          this.input = el
        }
      },
      getTextClass: function () {
        if (this.search().length > 0)
          return "filtered"
        else if(attrs.model.isDirty()) {
          return ""
        }
        else {
          return "default"
        }
      }
    }
  },

  view: function (ctrl, attrs) {
    return m(".ui.fluid.search.selection.dropdown",
      {
        class: ctrl.getClass(),
        onclick: ctrl.showMenu.bind(ctrl)
      },
      m("i.dropdown.icon"),
      ctrl.getMultipleSelections(),
      m("input.search[autocomplete=off][tabindex=0]",
        {
          config: ctrl.configInput.bind(ctrl),
          onfocus: ctrl.showMenu.bind(ctrl),
          onkeyup: m.withAttr("value", ctrl.search),
          value: ctrl.search()
        }),
      m(".text", {class: ctrl.getTextClass.call(ctrl)}, ctrl.getSingleSelection()),
      ctrl.getMenu())
  }
}
