var fieldModel = powerform({
	name: {
		validator: function (value) {
			return validate.single(value, {presence: true});
		},
		default: ""}
});

var checkboxModel = powerform({
	isFlash: function (value) {
		if(!value) return "This field cannot be false.";
	}
});

var passwordForm = powerform({
  password: function (value) {
		return validate.single(value, {presence: true, length: {minimum: 8}});
	},
  confirmPassword: function (value, model) {
		if (value !== model.password()) return "Password could not be confirmed.";
	}
});

var superheroes = [{label: "-- Superheroes --", value: ""},
                  {label: "Batman", value: 1},
                  {label: "Superman", value: 2},
                  {label: "Flash", value: 3}];
var selectModel = powerform({
	superhero: {
		validator: function (value) {
			if (!value) return "This field is required.";
		},
		default: ""}}).superhero;

var container = ui.container.container;
var grid = ui.grid.grid;
var row = ui.row.row;
var column = ui.column.column;
var divider = ui.divider.divider;
var menu = ui.menu.menu;
var item = ui.item.item;
var card = ui.card.card;
var content = ui.content.content;
var header = ui.header.header;
var icon = ui.icon.icon;
var meta = ui.meta.meta;
var subHeader = ui.subHeader.subHeader;
var description = ui.description.description;
var button = ui.button.button;
var form = ui.form.form;
var select = ui.select.select;
var input = ui.input.input;
var field = ui.field.field;
var checkbox = ui.checkbox.checkbox;

var app = {
  view: function () {
    return m(container,
						 m(grid, {reverse: "tablet"},
							 m(row, {dom: {className: "myclass"}},
								 m(column, {mobile: 16, tablet: 8, computer: 8, largeScreen: 4, widescreen: 4},
                   m(divider),
									 m(menu, {dom: {className: "vertical"}},
										 m(item, "Home"),
										 m(item, "About"),
										 m(item, "Contact Us")),
                   m(divider),
									 m(card, {dom: {className: "centered"}},
										 m(content,
											 m(header,
												 m(icon, {dom: {className: "right floated like"}}),
												 "This is an awesome header",
												 m(subHeader, "This is a sub header."),
												 m(meta,
													 m("span", {style: {color: "red"}}, "meta1"), m("span", "meta2")))),
										 m(content,
											 m(description, "This is a description.")),
										 m(content,
											 m(button, {dom: {className: "fluid"}}, "Click Me"))),
									 m(divider),
									 m(form,
										 m("h1", "Select"),
										 m(select, {model: selectModel,
																	 label: "Superhero",
																	 help: "Please choose a superhero.",
																	 options: superheroes}),
										 m("h1", "Input"),
										 m(input, {dom: {className: "ui labeled icon input"},
															 prepend: m(".ui.label", m("i.users.icon")),
															 append: m("i.search.icon"),
															 type: "number",
															 placeholder: "Number"}),
										 m("h1", "Field"),
										 m(field, {model: fieldModel.name,
																	label: "Text Field",
																	placeholder: "TextField",
																	update: "onchange",
																	validate: "onchange",
																	help: "This is a text field.",
																	type: "text"}),
										 m("h1", "Checkbox"),
										 m(checkbox, {model: checkboxModel.isFlash,
																		 label: "Is flash"}))))));
  }
};

m.mount(document.body, app);
