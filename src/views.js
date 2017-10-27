"use strict";

import * as text from "./editors/TextEditor";
import * as name from "./editors/NameEditor";
import * as pass from "./editors/PasswordEditor";
import
{
  select,
  multiselect
}
from "./editors/SelectionEditor";
import
{
  showEditor,
  keyValue
}
from "./editors/Editors";

// ==========================
// LOGIN
// ==========================
function emailLogin(accounts, parent, method, callback, options)
{
  parent.P()
    .Strong('Login using ' + method.method);

  let table = parent.Table()
    .Width('100%')
    .Tbody(),
    tr, td;

  tr = table.Tr();
  let serial = 1;

  tr.Td(`${serial++}.`);
  let emailInput = tr.Td()
    .Colspan(3)
    .Email()
    .Width('100%')
    .Placeholder('Please enter your email address')
    .Autocomplete("off")
    .Id('login-input-username');

  let recaptcha = 0;

  if (method.recaptcha)
  {
    tr = table.Tr();
    tr.Td(`${serial++}.`);
    td = tr.Td()
      .Colspan(3);
    recaptcha = grecaptcha.render(td.node(), {
      sitekey: method.recaptcha
    });
  }

  tr = table.Tr();
  tr.Td(`${serial++}.`);
  td = tr.Td();
  let passwordInput = td.Password()
    .Width('100%')
    .Placeholder('I remember my password')
    .Autocomplete("off")
    .Id('login-input-password');
  let passwordLogin = td.Button('Login using password')
    .Id('login-submit');
  tr.Td('or')
    .Padding('1em');
  td = tr.Td('')
  let passwordlessLogin = td.Button(options.passwordlessLabel || (options.loginLinkPrefix ? 'Send me a magic link' : 'Send me a one time password'));
  if (options.passwordlessNotice)
  {
    td.P(options.passwordlessNotice);
    // 'If you do not have an account, use this option to log in. A new account will be created for you. You may need to refer to an administrator to gain access to protected content.'
  }

  let verification = td.Div();

  function getParams()
  {
    let username = emailInput.Value();
    let password = passwordInput.Value();
    let loginLinkPrefix = options.loginLinkPrefix ? `${options.loginLinkPrefix}&${options.usernameParam || 'u'}=${username}&${options.passwordParam || 't'}=` : undefined;
    let recaptchaResponse = method.recaptcha ? grecaptcha.getResponse(recaptcha) : undefined;
    if (method.recaptcha)
    {
      setTimeout(() => grecaptcha.reset(recaptcha), 3000);
    }
    return {
      username,
      password,
      loginLinkPrefix,
      recaptchaResponse,
    };
  }

  passwordLogin.OnClick(() =>
  {
    accounts.login(method, getParams())
      .then(callback, x => alert(x.error || x));
  });

  passwordlessLogin.OnClick(() =>
  {
    accounts.loginPasswordless(method, getParams(), options.passwordlessMode || 'passwordless')
      .then(x => alert(x.success || x), x => alert(x.error || x));
  });

  passwordInput.OnKeydown(() =>
  {
    if (event && event.key === 'Enter')
    {
      passwordLogin.OnClick()();
    }
  });

  emailInput.OnKeydown(() =>
  {
    if (event && event.key === 'Enter')
    {
      passwordlessLogin.OnClick()();
    }
  });

  if (options.username)
  {
    emailInput.Value(options.username)
    if (options.password)
    {
      passwordInput.Value(options.password);
      passwordLogin.OnClick()();
    }
  }
}

function oneClickLogin(accounts, parent, method, callback)
{
  parent.Button('Log in using ' + method.method)
    .OnClick(() =>
    {
      accounts.login(method)
        .then(callback, x => alert(x.error || x));
    });
}

const loginMethodViews = {
  email: emailLogin
};

export function showLoginView(accounts, parent, options = {})
{
  return new Promise(resolve =>
  {
    parent.loader('Logging in');
    accounts.loginMethods()
      .then(methods =>
      {
        parent.clear();
        for (let method of methods)
        {
          let container = parent.Div();
          try
          {
            (loginMethodViews[method.method] || oneClickLogin)(accounts, container.Div(), method, resolve, options);
          }
          catch (e)
          {
            console.error(e);
          }
        }
      });
  });
}

// ==========================
// PROFILE
// ==========================

const makeDefaultFields = function (options)
{
  const output = {
    displayName: {
      label: 'Display Name',
      defaultValue: '',
      editor: text
    },
    password: {
      label: 'Password',
      editor: pass,
      // customAdmin: function(parent, value, save)
      // {
      //   if (value)
      //   {
      //     keyValue(parent, this.label).Button('Delete').OnClick(() => save(false));
      //   }
      // }
    },
  };
  if (options.roles)
  {
    output.roles = {
      label: 'Roles',
      editor: multiselect(options.roles)
    };
  }
  return output;
}

/**
 * xxx
 */
export async function showProfileView(accounts, parent, options = {})
{
  function save(field)
  {
    return function (value)
    {
      let update = {};
      update[field] = value;
      accounts.updateCurrentUser(update)
        .then(xx => alert(xx.success), err => alert(err.error));
    };
  }

  parent.loader('Loading Profile');

  const defaultFields = makeDefaultFields(options);
  const record = await accounts.currentUser();
  const fields = await accounts.fields();

  parent.clear();

  for (let field of fields.filter(field => field.enabled && field.self))
  {
    let meta = defaultFields[field.name] || (options.fields || {})[field.name];
    if (meta)
    {
      showEditor(keyValue(parent, meta.label), meta.editor, record[field.name] || meta.defaultValue, save(field.name));
    }
  }
}

// ==========================
// MANAGE USERS
// ==========================

export function showManageView(accounts, parent, options = {})
{
  parent.clear();
  let list = parent.Div();
  let sub = parent.Div()
    .Display('none');
  const usersList = list.Table()
    .Class('table')
    .Tbody();
  let tr = usersList.Tr();
  tr.Th('Name');
  tr.Th('Roles');
  tr.Th('Actions');
  const moreList = list.Div();
  let allUsers = [];
  async function load()
  {
    moreList.loader('Loading users');
    const results = await accounts.searchUsers({
      offset: allUsers.length
    });
    usersList.clear();
    allUsers = allUsers.concat(results.results);
    allUsers.forEach(user =>
    {
      let tr = usersList.Tr();
      tr.Td(user.displayName);
      tr.Td(Object.keys(user.roles)
        .filter(r => user.roles[r])
        .join(', '));
      let td = tr.Td();
      td.Button('Edit')
        .OnClick(editUser.bind(null, user));
      td.Button('Delete')
        .OnClick(deleteUser.bind(null, user));
    });
    moreList.clear()
      .Button('Load More')
      .OnClick(load);
    if (options.newUserTypes)
    {
      moreList.Button('New User')
        .OnClick(newUser);
    }
  }
  async function reload()
  {
    allUsers = [];
    await load();
  }

  function editUser(user)
  {
    list.Display('none');
    sub.Display('')
      .loader();
    async function display()
    {
      try
      {
        const id = user.id;
        const defaultFields = makeDefaultFields(options);
        const record = await accounts.readUser(user.id);
        const fields = await accounts.fields();

        function save(field, refresh)
        {
          return function (value)
          {
            let update = {};
            update[field] = value;
            accounts.updateUser(id, update)
              .then(xx =>
              {
                alert(xx.success);
                if (refresh)
                {
                  display();
                }
              }, err => alert(err.error));
          };
        }

        sub.clear();
        sub.H2(`Edit ${record.displayName}`);

        for (let field of fields.filter(field => field.enabled && field.admin))
        {
          let meta = defaultFields[field.name] || (options.fields || {})[field.name];
          if (meta)
          {
            showEditor(keyValue(sub, meta.label), meta.editor, record[field.name] || meta.defaultValue, save(field.name));
          }
        }
        //
        // showEditor(keyValue(sub, 'Display Name'), text, record.displayName || '', save('displayName'));
        // if (record.password)
        // {
        //   keyValue(sub, 'Password').Button('Delete').OnClick(() => save('password', true)(''));
        // }
        // if (options.notification)
        // {
        //   if (options.notification.interval)
        //   {
        //     showEditor(keyValue(sub, 'Notify Me'), select(options.notification.interval), record.notificationInterval, save('notificationInterval'));
        //   }
        //   if (options.notification.subscription)
        //   {
        //     showEditor(keyValue(sub, 'Notification Subscriptions'), multiselect(options.notification.subscription), record.notificationSubscriptions || {}, save('notificationSubscriptions'));
        //   }
        // }
        // if (options.roles)
        // {
        //   showEditor(keyValue(sub, 'Roles'), multiselect(options.roles), record.roles || {}, save('roles'));
        // }

        sub.Button('Back')
          .OnClick(() =>
          {
            list.Display('');
            sub.Display('none');
            reload();
          });
      }
      catch (err)
      {
        alert(err.message);
      }
    }
    display();
  }

  function deleteUser(user)
  {
    list.Display('none');
    sub.Display('')
      .clear();
    sub.H2(`Do you want to delete this user: ${user.displayName}?`);
    sub.Button('Yes')
      .OnClick(() =>
      {
        accounts.deleteUser(user.id)
          .then(x =>
          {
            alert(x.success);
            list.Display('');
            sub.Display('none');
            reload();
          }, x => alert(x.error));
      });
    sub.Button('No')
      .OnClick(() =>
      {
        list.Display('');
        sub.Display('none');
      });
  }
  async function newUser()
  {
    list.Display('none');
    sub.Display('')
      .clear();
    Object.keys(options.newUserTypes)
      .forEach(type_ =>
      {
        sub.H2(`Create New User With ${options.newUserTypes[type_]}:`);
        const inputCredential = sub.InputText()
          .Placeholder(`Enter new ${type_} here:`);
        sub.Button('Create')
          .OnClick(async() =>
          {
            const credential = inputCredential.Value()
              .replace(/\s/g, '');
            if (credential)
            {
              try
              {
                const response = await accounts.createUser(type_, credential);
                alert(response.success)
                list.Display('');
                sub.Display('none');
                await reload();
                editUser(response.user);
              }
              catch (err)
              {
                console.log(err)
                alert(err.error || err.message);
              }
            }
            else
            {
              alert(`Please input ${type}`)
            }
          });
        sub.Button('Cancel')
          .OnClick(() =>
          {
            list.Display('');
            sub.Display('none');
          });
      });

  }
  load();
}
