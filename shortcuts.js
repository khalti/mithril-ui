var sf = require("./helpers/shortcutFactory.js");
var column = require("./components/column.js");
var divider = require("./components/divider.js");
var icon = require("./components/icon.js");
var meta = require("./components/meta.js");
var segment = require("./components/segment.js");
var button = require("./components/button.js");
var container = require("./components/container.js");
var field = require("./components/field.js");
var input = require("./components/input.js");
var passwordConfirmationField = require("./components/passwordConfirmationField.js");
var segments = require("./components/segments.js");
var card = require("./components/card.js");
var content = require("./components/content.js");
var grid = require("./components/grid.js");
var item = require("./components/item.js");
var passwordField = require("./components/passwordField.js");
var select = require("./components/select.js");
var checkbox = require("./components/checkbox.js");
var description = require("./components/description.js");
var header = require("./components/header.js");
var menu = require("./components/menu.js");
var row = require("./components/row.js");
var subHeader = require("./components/subHeader.js");
var form = require("./components/form.js");
var fields = require("./components/fields.js");

module.exports = {
  // elements
  h1: sf("h1"),
  h2: sf("h2"),
  h3: sf("h3"),
  h4: sf("h4"),
  h5: sf("h5"),
  h6: sf("h6"),
  p: sf("p"),
  i: sf("i"),
  b: sf("b"),
  a: sf("a"),
  ul: sf("ul"),
  li: sf("li"),
  blockquote: sf("blockquote"),
  hr: sf("hr"),
  img: sf("img"),
  div: sf("div"),
  span: sf("span"),
  // components
  column: sf(column),
  divider: sf(divider),
  icon: sf(icon),
  meta: sf(meta),
  segment: sf(segment),
  button: sf(button),
  container: sf(container),
  field: sf(field),
  input: sf(input),
  passwordConfirmationField: sf(passwordConfirmationField),
  segments: sf(segments),
  card: sf(card),
  content: sf(content),
  grid: sf(grid),
  item: sf(item),
  passwordField: sf(passwordField),
  select: sf(select),
  checkbox: sf(checkbox),
  description: sf(description),
  header: sf(header),
  menu: sf(menu),
  row: sf(row),
  subHeader: sf(subHeader),
  form: sf(form),
  fields: sf(fields)
};
