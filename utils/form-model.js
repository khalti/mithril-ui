import _ from 'lodash';
import validate from 'validate.js';

function prop(model, field, defaultValue) {
  let initialState = defaultValue;
  let state = initialState;

  let aclosure = function (value) {
    if(arguments.length === 0)  return state;

    aclosure.errors = model.errors[field] = validate.single(
      value,
      _.omit(model._config[field], ['default']));

    state = value;
    };

  aclosure.is_dirty = function() {
    return initialState !== state;
    };

  return aclosure;
  };

export default function FormModel(config) {
  let formModel = {
    _config: config,
    errors: {},
    is_valid() {
      if (!this.is_dirty()) return false;
      return !_.some(_.keys(this._config), (akey) => {
        return this.errors[akey] && this.errors[akey].length > 0;
        });
      },

    is_dirty() {
      return _.some(_.keys(this._config), (akey) => {
        return this[akey].is_dirty();
        });
      },

    validate() {

      }
    };

  formModel._config = config;

  _.forEach(config, (avalue, akey) => {
    formModel[akey] = prop(formModel, akey, avalue.default);
    });

  return formModel;
  };
