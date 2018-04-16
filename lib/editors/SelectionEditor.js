"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.select = select;
exports.multiselect = multiselect;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function select(options) {
  function edit(parent, value, callback) {
    var control = parent.Select().Options(options).Value(value);
    control.OnInput(function () {
      callback(control.Value());
    });
  }

  function view(parent, value) {
    parent.text(options[value] || value || 'Not Set');
  }

  return {
    edit: edit,
    view: view
  };
}

function multiselect(options) {
  function edit(parent, value, callback) {
    value = JSON.parse((0, _stringify2.default)(value));
    (0, _keys2.default)(options).sort().forEach(function (option) {
      var row = parent.P();
      var id = Math.random() + '';
      var control = row.InputCheckbox().Id(id);
      row.Label(options[option]).For(id);
      if (value[option]) {
        control.Checked(value[option]);
      }
      control.OnChange(function () {
        value[option] = control.Checked();
        callback(value);
      });
    });
  }

  function view(parent, value) {
    var text = (0, _keys2.default)(value).filter(function (x) {
      return value[x];
    }).map(function (x) {
      return options[x];
    }).join('; ');
    parent.text(text || 'None');
  }

  return {
    edit: edit,
    view: view
  };
}