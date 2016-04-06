import m from "mithril";
import Input from "components/input.js";
import Field from "components/field.js";
import Form  from "mithril-form";
import TextField from "components/textField.js";
import Checkbox from "components/checkbox.js";
import PasswordField from "components/passwordField.js";
import PasswordConfirmationField from "components/passwordConfirmationField.js";
import Selection from "components/selection.js";

import 'semantic-ui-css/semantic.css!';

const fieldModel = Form({name: {presence: true, default: ""}});
const checkboxModel = Form({isFlash:
  {exclusion: {within: [false]}}});
const passwordForm = Form({
  password: {presence: true, length: {minimum: 8}},
  confirmPassword: {presence: true, equality: "password"}
});
const selectionForm = Form({
  element: {presence: true},
  elements: {presence: true}
})

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
          placeholder: "TextField",
          update: "onchange",
          validate: "onchange",
          help: "This is a text field.",
          type: "text"
        }),
        m("h1", "Checkbox"),
        m.component(Checkbox, {
          model: checkboxModel.isFlash,
          label: "Is flash"
        }),
        m("h1", "Password"),
        m.component(PasswordField, {
          model: passwordForm.password,
          label: "Password",
          placeholder: "Password",
          help: "Password should at least be 8 characters long.",
          update: "onkeyup",
          validate: "onchange"
        }),
        m("h1", "Password"),
        m.component(PasswordConfirmationField, {
          model: passwordForm.confirmPassword,
          passwordModel: passwordForm.password,
          label: "Confirm Password",
          placeholder: "Confirm Password",
          help: "Please Confirm the password.",
          update: "onkeyup",
          validate: "onchange"
        }),
        m("h1", "Single Selection"),
        m.component(Selection, {
          model: selectionForm.element,
          items: [["Hydrogen", 1], ["Helium", 2], ["Lithium", 3]],
          placeholder: "Element",
          // multiple: ,
        })
      )
    );
  }
}

m.mount(document.body, app);
