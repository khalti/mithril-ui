require('semantic-ui-css/semantic.css!');

const sm = require('../index.js');
const m = require('mithril');

m.mount(document.getElementById('app'), {
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
        }));
  }
});
