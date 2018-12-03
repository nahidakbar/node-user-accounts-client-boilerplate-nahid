"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showProfileView = undefined;

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

/**
 * xxx
 */
var showProfileView = exports.showProfileView = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(accounts, parent) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var save, defaultFields, record, fields, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, field, meta;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            save = function save(field) {
              return function (value) {
                var update = {};
                update[field] = value;
                accounts.updateCurrentUser(update).then(function (xx) {
                  return alert(xx.success);
                }, function (err) {
                  return alert(err.error);
                });
              };
            };

            parent.loader('Loading Profile');

            defaultFields = makeDefaultFields(options);
            _context.next = 5;
            return accounts.currentUser();

          case 5:
            record = _context.sent;
            _context.next = 8;
            return accounts.fields();

          case 8:
            fields = _context.sent;


            parent.clear();

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 13;
            for (_iterator2 = (0, _getIterator3.default)(fields.filter(function (field) {
              return field.enabled && field.self;
            })); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              field = _step2.value;
              meta = defaultFields[field.name] || (options.fields || {})[field.name];

              if (meta) {
                (0, _Editors.showEditor)((0, _Editors.keyValue)(parent, meta.label), meta.editor, record[field.name] || meta.defaultValue, save(field.name));
              }
            }
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](13);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 21:
            _context.prev = 21;
            _context.prev = 22;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 24:
            _context.prev = 24;

            if (!_didIteratorError2) {
              _context.next = 27;
              break;
            }

            throw _iteratorError2;

          case 27:
            return _context.finish(24);

          case 28:
            return _context.finish(21);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[13, 17, 21, 29], [22,, 24, 28]]);
  }));

  return function showProfileView(_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

// ==========================
// MANAGE USERS
// ==========================

exports.showLoginView = showLoginView;
exports.showManageView = showManageView;

var _TextEditor = require("./editors/TextEditor");

var text = _interopRequireWildcard(_TextEditor);

var _NameEditor = require("./editors/NameEditor");

var name = _interopRequireWildcard(_NameEditor);

var _PasswordEditor = require("./editors/PasswordEditor");

var pass = _interopRequireWildcard(_PasswordEditor);

var _SelectionEditor = require("./editors/SelectionEditor");

var _Editors = require("./editors/Editors");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==========================
// LOGIN
// ==========================
function emailLogin(accounts, parent, method, callback, options) {
  parent.P().Strong('Login using ' + method.method);

  var table = parent.Table().Width('100%').Tbody(),
      tr = void 0,
      td = void 0;

  tr = table.Tr();
  var serial = 1;

  tr.Td(serial++ + ".");
  var emailInput = tr.Td().Colspan(3).Email().Width('100%').Placeholder('Please enter your email address').Autocomplete("off").Id('login-input-username');

  var recaptcha = 0;

  if (method.recaptcha) {
    tr = table.Tr();
    tr.Td(serial++ + ".");
    td = tr.Td().Colspan(3);
    recaptcha = grecaptcha.render(td.node(), {
      sitekey: method.recaptcha
    });
  }

  tr = table.Tr();
  tr.Td(serial++ + ".");
  td = tr.Td();
  var passwordInput = td.Password().Width('100%').Placeholder('I remember my password').Autocomplete("off").Id('login-input-password');
  var passwordLogin = td.Button('Login using password').Id('login-submit');
  tr.Td('or').Padding('1em');
  td = tr.Td('');
  var passwordlessLogin = td.Button(options.passwordlessLabel || (options.loginLinkPrefix ? 'Send me a magic link' : 'Send me a one time password'));
  if (options.passwordlessNotice) {
    td.P(options.passwordlessNotice);
    // 'If you do not have an account, use this option to log in. A new account will be created for you. You may need to refer to an administrator to gain access to protected content.'
  }

  var verification = td.Div();

  function getParams() {
    var username = emailInput.Value();
    var password = passwordInput.Value();
    var loginLinkPrefix = options.loginLinkPrefix ? options.loginLinkPrefix + "&" + (options.usernameParam || 'u') + "=" + username + "&" + (options.passwordParam || 't') + "=" : undefined;
    var recaptchaResponse = method.recaptcha ? grecaptcha.getResponse(recaptcha) : undefined;
    if (method.recaptcha) {
      setTimeout(function () {
        return grecaptcha.reset(recaptcha);
      }, 3000);
    }
    return {
      username: username,
      password: password,
      loginLinkPrefix: loginLinkPrefix,
      recaptchaResponse: recaptchaResponse
    };
  }

  passwordLogin.OnClick(function () {
    accounts.login(method, getParams()).then(callback, function (x) {
      return alert(x.error || x);
    });
  });

  passwordlessLogin.OnClick(function () {
    accounts.loginPasswordless(method, getParams(), options.passwordlessMode || 'passwordless').then(function (x) {
      return alert(x.success || x);
    }, function (x) {
      return alert(x.error || x);
    });
  });

  passwordInput.OnKeydown(function () {
    if (event && event.key === 'Enter') {
      passwordLogin.OnClick()();
    }
  });

  emailInput.OnKeydown(function () {
    if (event && event.key === 'Enter') {
      passwordlessLogin.OnClick()();
    }
  });

  if (options.username) {
    emailInput.Value(options.username);
    if (options.password) {
      passwordInput.Value(options.password);
      passwordLogin.OnClick()();
    }
  }
}

function oneClickLogin(accounts, parent, method, callback) {
  parent.Button('Log in using ' + method.method).OnClick(function () {
    accounts.login(method).then(callback, function (x) {
      return alert(x.error || x);
    });
  });
}

var loginMethodViews = {
  email: emailLogin
};

function showLoginView(accounts, parent) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return new _promise2.default(function (resolve) {
    parent.loader('Logging in');
    accounts.loginMethods().then(function (methods) {
      parent.clear();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(methods), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var method = _step.value;

          var container = parent.Div();
          try {
            (loginMethodViews[method.method] || oneClickLogin)(accounts, container.Div(), method, resolve, options);
          } catch (e) {
            console.error(e);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
  });
}

// ==========================
// PROFILE
// ==========================

var makeDefaultFields = function makeDefaultFields(options) {
  var output = {
    displayName: {
      label: 'Display Name',
      defaultValue: '',
      editor: text
    },
    password: {
      label: 'Password',
      editor: pass
      // customAdmin: function(parent, value, save)
      // {
      //   if (value)
      //   {
      //     keyValue(parent, this.label).Button('Delete').OnClick(() => save(false));
      //   }
      // }
    }
  };
  if (options.roles) {
    output.roles = {
      label: 'Roles',
      editor: (0, _SelectionEditor.multiselect)(options.roles)
    };
  }
  return output;
};function showManageView(accounts, parent) {
  var load = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var results;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              moreList.loader('Loading users');
              _context2.next = 3;
              return accounts.searchUsers({
                offset: allUsers.length
              });

            case 3:
              results = _context2.sent;

              usersList.clear();
              allUsers = allUsers.concat(results.results);
              allUsers.forEach(function (user) {
                var tr = usersList.Tr();
                tr.Td(user.displayName);
                tr.Td((0, _keys2.default)(user.roles).filter(function (r) {
                  return user.roles[r];
                }).join(', '));
                var td = tr.Td();
                td.Button('Edit').OnClick(editUser.bind(null, user));
                td.Button('Delete').OnClick(deleteUser.bind(null, user));
              });
              moreList.clear().Button('Load More').OnClick(load);
              if (options.newUserTypes) {
                moreList.Button('New User').OnClick(newUser);
              }

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function load() {
      return _ref2.apply(this, arguments);
    };
  }();

  var reload = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              allUsers = [];
              _context3.next = 3;
              return load();

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function reload() {
      return _ref3.apply(this, arguments);
    };
  }();

  var newUser = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      var _this = this;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              list.Display('none');
              sub.Display('').clear();
              (0, _keys2.default)(options.newUserTypes).forEach(function (type_) {
                sub.H2("Create New User With " + options.newUserTypes[type_] + ":");
                var inputCredential = sub.InputText().Placeholder("Enter new " + type_ + " here:");
                sub.Button('Create').OnClick((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
                  var credential, response;
                  return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          credential = inputCredential.Value().replace(/\s/g, '');

                          if (!credential) {
                            _context5.next = 20;
                            break;
                          }

                          _context5.prev = 2;
                          _context5.next = 5;
                          return accounts.createUser(type_, credential);

                        case 5:
                          response = _context5.sent;

                          alert(response.success);
                          list.Display('');
                          sub.Display('none');
                          _context5.next = 11;
                          return reload();

                        case 11:
                          editUser(response.user);
                          _context5.next = 18;
                          break;

                        case 14:
                          _context5.prev = 14;
                          _context5.t0 = _context5["catch"](2);

                          console.log(_context5.t0);
                          alert(_context5.t0.error || _context5.t0.message);

                        case 18:
                          _context5.next = 21;
                          break;

                        case 20:
                          alert("Please input " + type);

                        case 21:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5, _this, [[2, 14]]);
                })));
                sub.Button('Cancel').OnClick(function () {
                  list.Display('');
                  sub.Display('none');
                });
              });

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function newUser() {
      return _ref5.apply(this, arguments);
    };
  }();

  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  parent.clear();
  var list = parent.Div();
  var sub = parent.Div().Display('none');
  var usersList = list.Table().Class('table').Tbody();
  var tr = usersList.Tr();
  tr.Th('Name');
  tr.Th('Roles');
  tr.Th('Actions');
  var moreList = list.Div();
  var allUsers = [];


  function editUser(user) {
    var display = function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var save, id, defaultFields, record, fields, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, field, meta;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                save = function save(field, refresh) {
                  return function (value) {
                    var update = {};
                    update[field] = value;
                    accounts.updateUser(id, update).then(function (xx) {
                      alert(xx.success);
                      if (refresh) {
                        display();
                      }
                    }, function (err) {
                      return alert(err.error);
                    });
                  };
                };

                id = user.id;
                defaultFields = makeDefaultFields(options);
                _context4.next = 6;
                return accounts.readUser(user.id);

              case 6:
                record = _context4.sent;
                _context4.next = 9;
                return accounts.fields();

              case 9:
                fields = _context4.sent;


                sub.clear();
                sub.H2("Edit " + record.displayName);

                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context4.prev = 15;
                for (_iterator3 = (0, _getIterator3.default)(fields.filter(function (field) {
                  return field.enabled && field.admin;
                })); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  field = _step3.value;
                  meta = defaultFields[field.name] || (options.fields || {})[field.name];

                  if (meta) {
                    (0, _Editors.showEditor)((0, _Editors.keyValue)(sub, meta.label), meta.editor, record[field.name] || meta.defaultValue, save(field.name));
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

                _context4.next = 23;
                break;

              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4["catch"](15);
                _didIteratorError3 = true;
                _iteratorError3 = _context4.t0;

              case 23:
                _context4.prev = 23;
                _context4.prev = 24;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 26:
                _context4.prev = 26;

                if (!_didIteratorError3) {
                  _context4.next = 29;
                  break;
                }

                throw _iteratorError3;

              case 29:
                return _context4.finish(26);

              case 30:
                return _context4.finish(23);

              case 31:
                sub.Button('Back').OnClick(function () {
                  list.Display('');
                  sub.Display('none');
                  reload();
                });
                _context4.next = 37;
                break;

              case 34:
                _context4.prev = 34;
                _context4.t1 = _context4["catch"](0);

                alert(_context4.t1.message);

              case 37:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 34], [15, 19, 23, 31], [24,, 26, 30]]);
      }));

      return function display() {
        return _ref4.apply(this, arguments);
      };
    }();

    list.Display('none');
    sub.Display('').loader();

    display();
  }

  function deleteUser(user) {
    list.Display('none');
    sub.Display('').clear();
    sub.H2("Do you want to delete this user: " + user.displayName + "?");
    sub.Button('Yes').OnClick(function () {
      accounts.deleteUser(user.id).then(function (x) {
        alert(x.success);
        list.Display('');
        sub.Display('none');
        reload();
      }, function (x) {
        return alert(x.error);
      });
    });
    sub.Button('No').OnClick(function () {
      list.Display('');
      sub.Display('none');
    });
  }

  load();
}