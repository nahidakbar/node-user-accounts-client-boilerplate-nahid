export function edit(parent, name, callback)
{
  let given = parent.Text()
    .Value(name.givenName)
    .Placeholder('Given Name');
  let middle = parent.Text()
    .Value(name.middleName)
    .Placeholder('Middle Name');
  let family = parent.Text()
    .Value(name.familyName)
    .Placeholder('Family Name');
  given.OnInput(() =>
  {
    const givenName = given.Value() || undefined;
    const middleName = middle.Value() || undefined;
    const familyName = family.Value() || undefined;
    callback({
      givenName,
      middleName,
      familyName
    });
  });
  middle.OnInput(given.OnInput());
  family.OnInput(given.OnInput());
}

export function view(parent, name)
{
  parent.text([name.givenName, name.middleName, name.familyName].filter(i => i)
    .join(' '));
}
