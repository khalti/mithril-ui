var fieldModel = Form({name: {presence: true, default: ""}});
var checkboxModel = Form({isFlash:
  {exclusion: {within: [false]}}});
var passwordForm = Form({
  password: {presence: true, length: {minimum: 8}},
  confirmPassword: {presence: true, equality: "password"}
});

var superheroes = [{label: "-- Superheroes --", value: ""},
                  {label: "Batman", value: 1},
                  {label: "Superman", value: 2},
                  {label: "Flash", value: 3}];
var selectModel = Form({superhero: {presence: true, default: ""}}).superhero;

var container = ui.shortcutFactory(ui.container);
var grid = ui.shortcutFactory(ui.grid);
var row = ui.shortcutFactory(ui.row);
var column = ui.shortcutFactory(ui.column);
var divider = ui.shortcutFactory(ui.divider);
var menu = ui.shortcutFactory(ui.menu);
var item = ui.shortcutFactory(ui.item);
var card = ui.shortcutFactory(ui.card);
var content = ui.shortcutFactory(ui.content);
var header = ui.shortcutFactory(ui.header);
var icon = ui.shortcutFactory(ui.icon);
var meta = ui.shortcutFactory(ui.meta);
var subHeader = ui.shortcutFactory(ui.subHeader);
var description = ui.shortcutFactory(ui.description);
var button = ui.shortcutFactory(ui.button);

var app = {
  view: function () {
    return container(
      grid({reverse: "tablet"},
           row({class: "myclass"},
               column({mobile: 16, tablet: 8, computer: 8, largeScreen: 4, widescreen: 4},
                      divider(),
                      menu({class: "vertical"},
                           item("Home"),
                           item("About"),
                           item("Contact Us")),
                      divider(),
                      card({class: "centered"},
                           content(
                             header(
                               icon({class: "right floated like", node: "i"}),
                               "This is an awesome header",
                               subHeader("This is a sub header."),
                               meta(
                                 m("span", "meta1"), m("span", "meta2")))),
                           content(
                             description("This is a description.")),
                           content(
                             button({class: "fluid"}, "Click Me"))),
                      divider(),
                      m("form.ui.form",
                        m("h1", "Select"),
                        m.component(ui.select, {model: selectModel,
                                                label: "Superhero",
                                                help: "Please choose a superhero.",
                                                options: superheroes
                                            }),
                     m('h1', "Input"),
                     m.component(ui.input, {class: "ui labeled icon input",
                                            prepend: m(".ui.label", m("i.users.icon")),
                                            append: m("i.search.icon"),
                                            type: "number",
                                            placeholder: "Number"}),
                     m("h1", "Field"),
                     m.component(ui.field, {model: fieldModel.name,
                                            label: "Text Field",
                                            placeholder: "TextField",
                                            update: "onchange",
                                            validate: "onchange",
                                            help: "This is a text field.",
                                            type: "text"}),
                     m("h1", "Checkbox"),
                     m.component(ui.checkbox, {model: checkboxModel.isFlash,
                                               label: "Is flash"}),
                     m("h1", "Password"),
                     m.component(ui.passwordField, {model: passwordForm.password,
                                                    label: "Password",
                                                    placeholder: "Password",
                                                    help: "Password should at least be 8 characters long.",
                                                    update: "onkeyup",
                                                    validate: "onchange"}),
                     m("h1", "Password"),
                     m.component(ui.passwordConfirmationField, {
                       model: passwordForm.confirmPassword,
                       passwordModel: passwordForm.password,
                       label: "Confirm Password",
                       placeholder: "Confirm Password",
                       help: "Please Confirm the password.",
                       update: "onkeyup",
                       validate: "onchange"})))))
    );
  }
}

m.mount(document.body, app);
