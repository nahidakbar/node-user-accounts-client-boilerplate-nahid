'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endpoint = endpoint;
function endpoint() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.json';

  return function () {
    var path = prefix;
    for (var x = 0; x < arguments.length; x++) {
      path += '/' + arguments[x];
    }
    return path + format;
  };
}