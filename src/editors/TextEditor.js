"use strict";

export function edit(parent, value, callback)
{
  let control = parent.Text()
    .Value(value);
  control.OnInput(() =>
  {
    callback(control.Value());
  });
}

export function view(parent, value)
{
  if (value)
  {
    parent.text(value);
  }
  else
  {
    parent.text('[Empty]');
  }
}
