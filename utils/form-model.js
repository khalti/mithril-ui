var _ = require('lodash')
var validate = require('validate.js')

function prop(model, field, defaultValue) {
  var initialState = defaultValue;
  var state = initialState;

  var aclosure = function (value) {
    if(arguments.length === 0)  return state;

    // for equality
    if (model._config[field].equality) {
      var equalAgainst = model._config[field].equality;
      var values = {
        [equalAgainst]: model[equalAgainst](),
        [field]: value
      };
      var constrains = {
        [field]: _.omit(model._config[field], ['default'])
      };
      var errors = validate(values, constrains);
      if (!model.errors) model.errors = {} // formModel.is_valid() sets it undefined
      aclosure.errors = model.errors[field] = errors? errors[field]: undefined;
      }
    else {
      aclosure.errors = model.errors[field] = validate.single(
        value,
        _.omit(model._config[field], ['default']));
      }
    state = value;
    };

  aclosure.is_dirty = function() {
    return initialState !== state;
    };

  return aclosure;
  };

module.exports =  function (config) {
  var formModel = {
    _config: config,
    errors: {},
    is_valid(attach_errors) {
      var self = this
      if (!this.is_dirty()) return false;

      var config = {}
      _.forEach(this._config, function (avalue, akey) {
        config[akey] = _.omit(avalue, ["default"])
      })

      var errors = validate(this.values(), config)

      if (attach_errors) this.errors = errors

      return errors === undefined
      },

    is_dirty() {
      var self = this
      return _.some(_.keys(this._config), function (akey) {
        return self[akey].is_dirty();
        });
      },

    validate() {
      this.errors = validate(this.values(), this._config);
      },

    values() {
      var dict = {};
      var self = this
      _.forEach(this._config, function (avalue, akey) {
        dict[akey] = self[akey]();
        });

      return dict;
      }
    };

  formModel._config = config;

  _.forEach(config, function (avalue, akey) {
    formModel[akey] = prop(formModel, akey, avalue.default);
    });

  return formModel;
  };
