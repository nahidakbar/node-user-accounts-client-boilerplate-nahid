"use strict";


export function select(options)
{
  function edit(parent, value, callback)
  {
    let control = parent.Select()
      .Options(options)
      .Value(value);
    control.OnInput(() =>
    {
      callback(control.Value());
    });
  }

  function view(parent, value)
  {
    parent.text(options[value] || value || 'Not Set');
  }

  return {
    edit,
    view
  };
}

export function multiselect(options)
{
  function edit(parent, value, callback)
  {
    value = JSON.parse(JSON.stringify(value));
    Object.keys(options)
      .sort()
      .forEach(option =>
      {
        let row = parent.P();
        let id = Math.random() + '';
        let control = row.InputCheckbox()
          .Id(id);
        row.Label(options[option])
          .For(id);
        if (value[option])
        {
          control.Checked(value[option]);
        }
        control.OnChange(() =>
        {
          value[option] = control.Checked();
          callback(value);
        });
      });
  }

  function view(parent, value)
  {
    let text = Object.keys(value)
      .filter(x => value[x])
      .map(x => options[x])
      .join('; ');
    parent.text(text || 'None');
  }

  return {
    edit,
    view
  };
}
