"use strict";

export function edit(parent, value, callback)
{
  let control = parent.InputPassword();
  control.OnInput(() =>
  {
    callback(control.Value());
  });
  callback('');
}

export function view(parent, value)
{
  if (value)
  {
    parent.text('[Set]');
  }
  else
  {
    parent.text('[Not Set]');
  }
}
