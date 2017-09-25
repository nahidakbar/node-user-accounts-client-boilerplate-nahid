import
{
  event
}
from 'd3-selection';

export function showEditor(parent, editor, value, saveCallback, orderMatters = false)
{
  value = value || '';

  function view()
  {
    editor.view(parent.clear(), value);
    parent.Button('Edit')
      .Title('Edit Item')
      .Class('editor')
      .OnClick(() =>
      {
        edit();
        event && event.preventDefault();
      });
  }

  function edit()
  {
    let newValue = value;
    editor.edit(parent.clear(), value, newVal => newValue = newVal);
    parent.Button('Save')
      .Title('Save Changes')
      .Class('editor')
      .OnClick(() =>
      {
        console.log(newValue, value);
        if (newValue !== value)
        {
          saveCallback(newValue);
          value = newValue;
        }
        view();
        event && event.preventDefault();
      });
    parent.Button('Discard')
      .Title('Discard Changes')
      .Class('editor')
      .OnClick(() =>
      {
        view();
        event && event.preventDefault();
      });
  }
  view();
}

function defaultAdd(defaultValue)
{
  return new Promise(resolve => resolve(defaultValue));
}

export function showArrayEditor(container, editor, data, saveCallback, defaultValue = '')
{
  data = data || [];

  function save()
  {
    saveCallback(data.filter(i => i && JSON.stringify(i) != JSON.stringify(defaultValue)));
    render();
  }

  function render()
  {
    container.clear();
    data.forEach(function (item, itemIndex)
    {
      let row = container.Div();

      function edit()
      {
        let newValue = item;
        editor.edit(row.clear(), item, value =>
        {
          newValue = value;
        });
        row.Button('Save')
          .Title('Save Changes')
          .Class('editor')
          .OnClick(() =>
          {
            if (newValue !== item)
            {
              data[itemIndex] = newValue;
              save();
            }
            view();
            event && event.preventDefault();
          });
        row.Button('Discard')
          .Title('Discard Changes')
          .Class('editor')
          .OnClick(() =>
          {
            view();
            event && event.preventDefault();
          });
      }

      function del()
      {
        data.splice(itemIndex, 1)
        save();
      }

      function view()
      {
        editor.view(row, data[itemIndex]);
        row.Button('Edit')
          .Title('Edit Item')
          .Class('editor')
          .OnClick(edit);
        row.Button('Delete')
          .Title('Delete Item')
          .Class('editor')
          .OnClick(del);
      }
      view();
    });
    if (data.length === 0)
    {
      container.Span('Empty');
    }
    container.Button('Add New')
      .Title('Add New Item')
      .Class('editor')
      .OnClick(add);
  }

  function add()
  {
    (editor.add || defaultAdd)(defaultValue)
    .then(value =>
    {
      data.push(JSON.parse(JSON.stringify(value)));
      if (data[data.length - 1])
      {
        save();
      }
      else
      {
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


export function section(parent, label)
{
  parent = parent.Table()
    .Tbody();
  parent.Tr()
    .Th(label);
  return parent.Tr()
    .Td();
}


export function keyValue(parent, label, class_ = '')
{
  parent = parent.Div()
    .Class('layout-key-value ' + class_);
  parent.Div(label)
    .Class('key');
  return parent.Div()
    .Class('value');
}
