import _ from 'lodash';
import validate from 'validate.js';

function prop(model, field, defaultValue) {
  let state = defaultValue;
  let aclosure = function (value) {
    if(arguments.length === 0)  return state;

    aclosure.errors(validate.single(
      value,
      _.omit(model._config[field], ['default'])));

      state = value;
    };

  aclosure.errors = function (errors) {
    if (arguments.length === 0)  return model.errors[field];
    model.errors[field] = errors;
  };

  return aclosure;
  };

export default function FormModel(config) {
  let formModel = {
    _config: config,
    errors: {},
    is_valid() {

      },
    is_dirty() {

      }
    };

  formModel._config = config;

  _.forEach(config, (avalue, akey) => {
    formModel[akey] = prop(formModel, akey, avalue.default);
    });

  return formModel;
  };
