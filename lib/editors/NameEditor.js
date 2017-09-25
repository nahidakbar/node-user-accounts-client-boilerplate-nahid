'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.edit = edit;
exports.view = view;
function edit(parent, name, callback) {
  var given = parent.Text().Value(name.givenName).Placeholder('Given Name');
  var middle = parent.Text().Value(name.middleName).Placeholder('Middle Name');
  var family = parent.Text().Value(name.familyName).Placeholder('Family Name');
  given.OnInput(function () {
    var givenName = given.Value() || undefined;
    var middleName = middle.Value() || undefined;
    var familyName = family.Value() || undefined;
    callback({
      givenName: givenName,
      middleName: middleName,
      familyName: familyName
    });
  });
  middle.OnInput(given.OnInput());
  family.OnInput(given.OnInput());
}

function view(parent, name) {
  parent.text([name.givenName, name.middleName, name.familyName].filter(function (i) {
    return i;
  }).join(' '));
}