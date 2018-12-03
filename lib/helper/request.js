"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultHeaders = undefined;

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.request = request;
exports.createRequest = createRequest;
exports.readRequest = readRequest;
exports.updateRequest = updateRequest;
exports.deleteRequest = deleteRequest;
exports.searchRequest = searchRequest;
exports.registerProgressCallback = registerProgressCallback;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultHeaders = exports.defaultHeaders = {};

function request(method, url) {
  var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var transform = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (x) {
    return x;
  };
  var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultHeaders;

  var start = Date.now();

  return new _promise2.default(function (resolve, reject) {

    function processResponse(err, xhr) {
      console.log(method, url, 'took', Date.now() - start, 'ms');
      xhr = xhr || err.target;
      var type = xhr && xhr.getResponseHeader('Content-Type') || 'text';
      if (err) {
        err = xhr.responseText;
        if (type.match(/json/)) {
          reject(JSON.parse(xhr.responseText));
        } else if (type.match(/text/)) {
          reject({
            error: xhr.responseText
          });
        } else {
          reject(err);
        }
      } else {
        if (type.match(/json/) || xhr.response && xhr.response.substr(0, 1) === '{') {
          resolve(transform(JSON.parse(xhr.responseText)));
        } else if (type.match(/text/)) {
          resolve(transform(xhr.responseText));
        } else {
          resolve(transform(xhr.response));
        }
      }
    }

    var req = new XMLHttpRequest();

    function progress(event) {
      if (progressCallback) {
        progressCallback(event, method + ' ' + url);
      }
    }
    req.addEventListener("progress", progress);
    req.upload && req.upload.addEventListener("progress", progress);

    req.addEventListener("readystatechange", function () {
      if (progressCallback) {
        progressCallback(null, method + ' ' + url);
      }
      if (this.readyState == 4) {
        if (this.status >= 200 && this.status < 300) {
          processResponse(null, this);
        } else {
          processResponse('ERROR', req);
        }
      }
    });

    req.open(method, url);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(headers)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref = _step.value;

        var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

        var header = _ref2[0];
        var value = _ref2[1];

        req.setRequestHeader(header, value);
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

    if ((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === "object" || typeof body === "string") {
      if (!(body instanceof FormData)) {
        req.setRequestHeader("Content-Type", "application/json");
        body = (0, _stringify2.default)(body);
      }
    }

    req.send(body || '');
  });
}

function createRequest() {
  return request.apply(null, ['POST'].concat(Array.prototype.slice.call(arguments)));
}

function readRequest() {
  return request.apply(null, ['GET'].concat(Array.prototype.slice.call(arguments)));
}

function updateRequest() {
  return request.apply(null, ['PUT'].concat(Array.prototype.slice.call(arguments)));
}

function deleteRequest() {
  return request.apply(null, ['DELETE'].concat(Array.prototype.slice.call(arguments)));
}

function searchRequest() {
  return request.apply(null, ['SEARCH'].concat(Array.prototype.slice.call(arguments)));
}

var progressCallback = false;

function registerProgressCallback(callback) {
  progressCallback = callback;
}