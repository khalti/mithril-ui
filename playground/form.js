import m from "mithril";
import Input from "components/input.js";
import Field from "components/field.js";
import FormModel from "utils/form-model.js";
import TextField from "components/text-field.js";

import 'semantic-ui-css/semantic.css!';

const fieldModel = FormModel({name: {presence: true}});

const app = {
  view: function () {
    return m('.ui.container',
      m("form.ui.form",
        m('h1', "Input"),
        m.component(Input, {
          class: "ui labeled icon input",
          prepend: m(".ui.label", m("i.users.icon")),
          append: m("i.search.icon"),
          type: "number",
          placeholder: "Number"}),
        m("h1", "Field"),
        m.component(Field, {
          class: "ui field",
          model: fieldModel.name,
          input: {
            class: "ui icon input",
            onchange: m.withAttr("value", fieldModel.name),
            append: m("i.search.icon"),
            type: "text",
            placeholder: "Name"},
          label: "The is a label."}),
        m("h1", "TextField"),
        m.component(TextField, {
          model: fieldModel.name,
          label: "Text Field",
          event: "onchange",
          help: "This is a text field.",
          type: "text"
        })
      )
    );
  }
}

m.mount(document.body, app);
