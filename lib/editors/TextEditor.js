"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.edit = edit;
exports.view = view;
function edit(parent, value, callback) {
  var control = parent.Text().Value(value);
  control.OnInput(function () {
    callback(control.Value());
  });
}

function view(parent, value) {
  if (value) {
    parent.text(value);
  } else {
    parent.text('[Empty]');
  }
}