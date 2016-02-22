'use strict';

require('semantic-ui-css/semantic.css!');
require('animate.css');
require('playground/style.css!');

const sm = require('index.js');
const m = require('mithril');
const _ = require('lodash');
const $ = require('jquery');
const ani = require('utils/animation.js');

// Add, Remove, Move, Change
let ARMC = {
  controller: function (pl) {
    const self = this;
    self.data = [
      {id: 1, text: '1. This is awesome'},
      {id: 2, text: '2. This is double awesome'},
      {id: 3, text: '3. This is double awesome'},
      {id: 4, text: '4. This is double awesome'},
      {id: 5, text: '5. This is triple awesome'}];

    self.add = (e) => {
      e.preventDefault();
      e.stopPropagation();
      self.data.unshift({id: 6, text: '6. This is babar awesome.'});
    };

    self.move = () => {
      let temp = self.data[1];
      self.data[1] = self.data[4];
      self.data[4] = temp;
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
      ani.map(c.data, (adata) => m('.ui.segment', adata.text)));
  }
};

let page1 = {
  view: function () {
    var model = {model: {sex: ''}};
    return m('.ui.container',
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

m.mount(document.body, page1);
console.dir(document.body.childNodes[0]);

// m.route(document.body, '/', {
//   '/': page1,
//   '/2': page2
// });
