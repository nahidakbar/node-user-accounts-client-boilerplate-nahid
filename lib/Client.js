"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = undefined;

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _endpoint = require("./helper/endpoint");

var _request = require("./helper/request");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Authentication Client
 */
var Client = exports.Client = function () {
  function Client() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Client);

    this.prefix = options.prefix || 'api/accounts';
    this.endpoint = (0, _endpoint.endpoint)(this.prefix);
  }

  (0, _createClass3.default)(Client, [{
    key: "currentUser",
    value: function currentUser() {
      return (0, _request.readRequest)(this.endpoint('current'));
    }
  }, {
    key: "updateCurrentUser",
    value: function updateCurrentUser(update) {
      return (0, _request.updateRequest)(this.endpoint('current'), update);
    }
  }, {
    key: "isLoggedIn",
    value: function isLoggedIn() {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        _this.currentUser().then(function (current) {
          if (!current) {
            resolve(false);
          } else {
            resolve(true);
          }
        }, reject);
      });
    }
  }, {
    key: "loginMethods",
    value: function loginMethods() {
      return (0, _request.readRequest)(this.endpoint('methods'));
    }
  }, {
    key: "login",
    value: function login(method, parameters) {
      console.log(method, parameters);
      if (method.redirect) {
        window.location = this.endpoint(method.method, 'login');
      } else {
        return (0, _request.createRequest)(this.endpoint(method.method, 'login'), parameters);
      }
    }
  }, {
    key: "loginPasswordless",
    value: function loginPasswordless(method, parameters) {
      var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'passwordless';

      console.log(method, parameters);
      return (0, _request.createRequest)(this.endpoint(method.method, mode), parameters);
    }
  }, {
    key: "logout",
    value: function logout() {
      return (0, _request.readRequest)(this.endpoint('logout'));
    }
  }, {
    key: "createUser",
    value: function createUser(credentialType, credentialValue) {
      return (0, _request.createRequest)(this.endpoint('new'), {
        type: credentialType,
        value: credentialValue
      });
    }
  }, {
    key: "searchUsers",
    value: function searchUsers() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return (0, _request.readRequest)(this.endpoint('search') + '?' + (0, _keys2.default)(options).map(function (x) {
        return x + "=" + options[x];
      }).join('&'));
    }
  }, {
    key: "readUser",
    value: function readUser(id) {
      return (0, _request.readRequest)(this.endpoint(id));
    }
  }, {
    key: "updateUser",
    value: function updateUser(id, update) {
      return (0, _request.updateRequest)(this.endpoint(id), update);
    }
  }, {
    key: "deleteUser",
    value: function deleteUser(id) {
      return (0, _request.deleteRequest)(this.endpoint(id));
    }
  }, {
    key: "fields",
    value: function fields() {
      return (0, _request.readRequest)(this.endpoint('fields'));
    }
  }]);
  return Client;
}();