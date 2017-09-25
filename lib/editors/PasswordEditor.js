"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.edit = edit;
exports.view = view;
function edit(parent, value, callback) {
  var control = parent.InputPassword();
  control.OnInput(function () {
    callback(control.Value());
  });
  callback('');
}

function view(parent, value) {
  if (value) {
    parent.text('[Set]');
  } else {
    parent.text('[Not Set]');
  }
}