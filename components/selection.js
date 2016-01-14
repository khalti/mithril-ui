const m = require('mithril');
const _ = require('lodash');
const $ = require('jquery');
const $$ = require('velocity');

module.exports = {
  controller: function (pl) {
    const self = this;
    self.dom = null;
    self.model = pl.model;
    self.field = pl.field;
    self.dropdownVisible =  false;

    self.toggleDropdown = function (e) {
      if (self.dropdownVisible) {
        m.startComputation();
        $$(self.dom.children('.menu'), 'slideUp', {
          duration: 300,
          complete: function () {
          self.dropdownVisible = !self.dropdownVisible;
          m.endComputation();
        }});
      }
      else {
        self.dropdownVisible = !self.dropdownVisible;
        $$(self.dom.children('.menu'), 'slideDown', {duration: 300});
      }};

    self.displayDropdown = function () {
        return self.dropdownVisible;
      };

    self.setValue = function (data) {
      self.model[self.field] = data;
    };

    self.getAlias = function (data) {
      return _.find(pl.options, {value: data}).alias;
    };

    self.config = function(el, initialized) {
      if(initialized) return;
      self.dom = $(el);
    };
  },
  view: function (c, pl) {
    return m("div.ui.selection.dropdown",
      {
        config: c.config,
        onclick: c.toggleDropdown,
        class: c.displayDropdown() ? 'active': ''
      },
      m("input[type=hidden][name=gender]"),
      m("i.dropdown.icon"),
      m("div.text", {class: c.model[c.field]? '': 'default'},
        c.getAlias(c.model[c.field] || '')),
      m(".menu", {style: {display: c.displayDropdown() ? 'block' : 'none'}},
        _.map(pl.options, function (pair) {
          return m("div.item",
            {
              class: c.model[c.field] == pair.value? 'active' : '',
              'data-value': pair.value,
              onclick: m.withAttr('data-value', c.setValue),
            },
            pair.html,
            pair.alias);
        })));
  }
};