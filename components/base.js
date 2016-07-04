module.exports = {
  mapClass: function (map, key) {
    return map[key];
  },
  getClassList: function (attrs) {
    throw Error("Implement this.");
  },
  getClass: function (attrs) {
    return this.getClassList(attrs).join(" ");
  },
  validateAttrs: function (attrs) {
    if (!this.attrSchema) throw Error("Please provide attrSchema. For reference checkout components/container.js");
    var errors = validate(attrs, this.attrSchema);
    if (errors) throw(JSON.stringify(errors));
  },
  getChildren: function (args) {
    var argsArray = [];
    for (var i = 0; i <= args.length; i ++) {
      argsArray.push(args[i]);
    }

    return argsArray.splice(2);
  }
};
