'use strict';

// require('semantic-ui-css/semantic.css!');
require('animate.css');
require('test/style.css!');

const sm = require('index.js');
const m = require('mithril');
const _ = require('lodash');
const $ = require('jquery');
const ani = require('utils/animation.js');

const map = function (collection, callback) {
  let output = [];
  _.forEach(collection, (item, index) => {
    output.push(callback(item, index));
  });
  return output;
};

const armc = function (data, index) {
  return function (el, initialized, ctx) {
    let dom = $(el);
    let addClass = 'animation add';
    let changeClass = 'animation change';
    // for addition of element
    if(!initialized) {
      dom.addClass(addClass)
        .one('animationend', () => dom.removeClass(addClass));
    }
    // for element move
    if (ctx.index && ctx.index < index) {
      dom.addClass('animation move low')
        .one('animationend', () => dom.removeClass('animation move low'));
    }
    else if (ctx.index && ctx.index > index) {
      dom.addClass('animation move high')
        .one('animationend', () => dom.removeClass('animation move high'));
    }
    // if change in data
    if (ctx.data && !_.isEqual(ctx.data, data)) {
      dom.addClass(changeClass)
        .one('animationend', () => dom.removeClass(changeClass));
    }
    // save state
    ctx.data = _.clone(data, true);
    ctx.index = index;
  };
};

const entry = function () {
  return function (el, initialized, ctx) {
    let dom = $(el);
    if (initialized) return;
    dom.addClass('animation enter')
      .one('animationend', () => dom.removeClass('animation enter'));
  };
};

let ARMC = {
  controller: function (pl) {
    const self = this;
    self.data = [
      {id: 1, text: '1. This is awesome'},
      {id: 2, text: '2. This is double awesome'},
      {id: 3, text: '3. This is triple awesome'}];

    self.add = (e) => {
      e.preventDefault();
      e.stopPropagation();
      self.data.unshift({id: 4, text: '4. This is babar awesome.'});
    };

    self.move = () => {
      let temp = self.data[1];
      self.data[1] = self.data[3];
      self.data[3] = temp;
    };

    self.change = () => {
      self.data[2].text = 'x. Change this yo';
    };
  },
  view: function (c, pl) {
    return m('.ui.segment',
        m('.ui.segment',
          m('.ui.button', {onclick: c.add}, 'Add'),
          m('.ui.button', {onclick: c.move}, 'Move'),
          m('.ui.button', {onclick: c.change}, 'Change')),
        map(c.data, (adata, index) => m('.ui.segment', {config: armc(adata, index), key: adata.id}, adata.text)));
  }
};

let page1 = {
  view: function () {
    var model = {model: {sex: ''}};
    return ani.ad('.ui.container',
      m('h1', 'Selection'),
      m('hr'),

      // Selection
      m.component(sm.Selection,
        {
          model: model,
          field: 'sex',
          label: 'Sex',
          options: [
            {value: '', alias: '-- Sex --'},
            {value: 'male', alias: 'Male', html: m('i.comment.icon')},
            {value: 'female', alias: 'Female', html: m('i.conversation.icon')}
          ]
        }),

      // add, remove, move, change test
      m('h1', 'Add, Remove, Move, Change'),
      m('hr'),
      m.component(ARMC));
  }
};

let page2 = {
  controller: function ()  {

  },
  view: function () {
    return m('.ui.container',
      m('h1', 'Welcome to page 2'));
  }
};


m.route(document.body, '/', {
  '/': page1,
  '/2': page2
});
