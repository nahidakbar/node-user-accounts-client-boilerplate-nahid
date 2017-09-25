"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.request = request;
exports.createRequest = createRequest;
exports.readRequest = readRequest;
exports.updateRequest = updateRequest;
exports.deleteRequest = deleteRequest;
exports.searchRequest = searchRequest;
exports.registerProgressCallback = registerProgressCallback;
function request(method, url) {
  var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var transform = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (x) {
    return x;
  };

  var start = Date.now();

  return new Promise(function (resolve, reject) {

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

    if ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) === "object" || typeof body === "string") {
      if (!(body instanceof FormData)) {
        req.setRequestHeader("Content-Type", "application/json");
        body = JSON.stringify(body);
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