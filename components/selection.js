'use strict';

const m = require('mithril');
const _ = require('lodash');
const $ = require('jquery');
const ani = require('utils/animation.js');


module.exports = {
  controller: function (pl) {
    const self = this;
    self.model = pl.model;
    self.field = pl.field;
    self.dropdownVisible =  false;

    self.toggleDropdown = function (e) {
      self.dropdownVisible = !self.dropdownVisible;
      };

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
      self.dom = $(el).children('.menu');
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
      ani.toggle(".menu", {_toggle: c.dropdownVisible},
      // ani.toggle(".menu",
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