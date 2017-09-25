'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showEditor = showEditor;
exports.showArrayEditor = showArrayEditor;
exports.section = section;
exports.keyValue = keyValue;

var _d3Selection = require('d3-selection');

function showEditor(parent, editor, value, saveCallback) {
  var orderMatters = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  value = value || '';

  function view() {
    editor.view(parent.clear(), value);
    parent.Button('Edit').Title('Edit Item').Class('editor').OnClick(function () {
      edit();
      _d3Selection.event && _d3Selection.event.preventDefault();
    });
  }

  function edit() {
    var newValue = value;
    editor.edit(parent.clear(), value, function (newVal) {
      return newValue = newVal;
    });
    parent.Button('Save').Title('Save Changes').Class('editor').OnClick(function () {
      console.log(newValue, value);
      if (newValue !== value) {
        saveCallback(newValue);
        value = newValue;
      }
      view();
      _d3Selection.event && _d3Selection.event.preventDefault();
    });
    parent.Button('Discard').Title('Discard Changes').Class('editor').OnClick(function () {
      view();
      _d3Selection.event && _d3Selection.event.preventDefault();
    });
  }
  view();
}

function defaultAdd(defaultValue) {
  return new Promise(function (resolve) {
    return resolve(defaultValue);
  });
}

function showArrayEditor(container, editor, data, saveCallback) {
  var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

  data = data || [];

  function save() {
    saveCallback(data.filter(function (i) {
      return i && JSON.stringify(i) != JSON.stringify(defaultValue);
    }));
    render();
  }

  function render() {
    container.clear();
    data.forEach(function (item, itemIndex) {
      var row = container.Div();

      function edit() {
        var newValue = item;
        editor.edit(row.clear(), item, function (value) {
          newValue = value;
        });
        row.Button('Save').Title('Save Changes').Class('editor').OnClick(function () {
          if (newValue !== item) {
            data[itemIndex] = newValue;
            save();
          }
          view();
          _d3Selection.event && _d3Selection.event.preventDefault();
        });
        row.Button('Discard').Title('Discard Changes').Class('editor').OnClick(function () {
          view();
          _d3Selection.event && _d3Selection.event.preventDefault();
        });
      }

      function del() {
        data.splice(itemIndex, 1);
        save();
      }

      function view() {
        editor.view(row, data[itemIndex]);
        row.Button('Edit').Title('Edit Item').Class('editor').OnClick(edit);
        row.Button('Delete').Title('Delete Item').Class('editor').OnClick(del);
      }
      view();
    });
    if (data.length === 0) {
      container.Span('Empty');
    }
    container.Button('Add New').Title('Add New Item').Class('editor').OnClick(add);
  }

  function add() {
    (editor.add || defaultAdd)(defaultValue).then(function (value) {
      data.push(JSON.parse(JSON.stringify(value)));
      if (data[data.length - 1]) {
        save();
      } else {
        render();
      }
    });
  }
  render();

  /*
  function view()
  {
    editor.view(parent.clear(), value);
    parent.A('&#x270e;').OnClick(() =>
    {
      edit();
      event && event.preventDefault();
    });
  }
  function edit()
  {
    let newValue = value;
    editor.edit(parent.clear(), value, newVal => newValue = newVal);
    parent.A('&#x1f4be;').OnClick(() =>
    {
      if (newValue !== value)
      {
        saveCallback(newValue);
        value = newValue;
      }
      view();
      event && event.preventDefault();
    });
    parent.A('&#x1f5d9;').OnClick(() =>
    {
      view();
      event && event.preventDefault();
    });
  }
  view();
  */
}

function section(parent, label) {
  parent = parent.Table().Tbody();
  parent.Tr().Th(label);
  return parent.Tr().Td();
}

function keyValue(parent, label) {
  var class_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  parent = parent.Div().Class('layout-key-value ' + class_);
  parent.Div(label).Class('key');
  return parent.Div().Class('value');
}