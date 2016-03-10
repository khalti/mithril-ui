var _ = require('lodash')
var validate = require('validate.js')

function prop(model, field, defaultValue) {
  var initialState = defaultValue;
  var state = initialState;

  var aclosure = function (value) {
    if(arguments.length === 0)  return state;
    state = value;
    };

  aclosure.is_dirty = function() {
    return initialState !== state;
    };

  aclosure.is_valid = function (attach_errors) {
    var errors
    var constrains = {}
    constrains[field] = _.omit(model._config[field], ['default'])
    var values = {}
    values[field] = aclosure()

    // for equality
    if (model._config[field].equality) {
      var equalAgainst = model._config[field].equality;
      values[equalAgainst] = model[equalAgainst]()
      }

    errors = validate(values, constrains);
    if(attach_errors !== false) {
      if (!model.errors) model.errors = {} // formModel.is_valid() sets it undefined
      aclosure.errors = model.errors[field] = errors? errors[field]: undefined;
    }

    return errors === undefined
  }

  return aclosure;
  };

module.exports =  function (config) {
  var formModel = {
    _config: config,
    errors: undefined,
    is_valid: function (attach_errors) {
      var self = this

      var config = {}
      _.forEach(this._config, function (avalue, akey) {
        config[akey] = _.omit(avalue, ["default"])
      })

      var errors = validate(this.values(), config)
      if (attach_errors !== false){
        self.errors = errors
        if (self.errors) {
          _.forEach(self._config, function (avalue, akey) {
            self[akey].errors = self.errors[akey]
            })
        }
      }

      return errors === undefined
      },

    is_dirty: function () {
      var self = this
      return _.some(_.keys(this._config), function (akey) {
        return self[akey].is_dirty();
        });
      },

    values: function () {
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
