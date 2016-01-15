'use strict';

const m = require('mithril');
const _ = require('lodash');
const $ = require('jquery');

// animation types
// show, hide x
// add, remove, move, change

let showHide = function (value) {
  return (el, initialized, context) => {
    let dom = $(el);

    if(!initialized) {
      if (value) {
        dom.css('display', 'block');
      }
      else {
        dom.css('display', 'none');
      }
      return;
    }

    if (value) {
      let className = 'animation show';
      dom.css('display', 'block');
      dom.addClass(className)
        .one('animationend', () => {dom.removeClass(className);});
    }
    else {
      let className = 'animation hide';
      dom.addClass(className)
        .one('animationend', () => {dom.removeClass(className);dom.css('display', 'none');});
    }
  };
};

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
      m(".menu", {config: showHide(c.dropdownVisible)},
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