"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _endpoint = require("./helper/endpoint");

var _request = require("./helper/request");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Authentication Client
 */
var Client = exports.Client = function () {
  function Client() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Client);

    this.prefix = options.prefix || '/api/accounts';
    this.endpoint = (0, _endpoint.endpoint)(this.prefix);
  }

  _createClass(Client, [{
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

      return new Promise(function (resolve, reject) {
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
      console.log(method, parameters);
      return (0, _request.createRequest)(this.endpoint(method.method, 'passwordless'), parameters);
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

      return (0, _request.readRequest)(this.endpoint('search') + '?' + Object.keys(options).map(function (x) {
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