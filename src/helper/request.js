"use strict";

export const defaultHeaders = {};

export function request(method, url, body = undefined, transform = x => x, headers=defaultHeaders)
{
  let start = Date.now();

  return new Promise((resolve, reject) =>
  {

    function processResponse(err, xhr)
    {
      console.log(method, url, 'took', Date.now() - start, 'ms');
      xhr = xhr || err.target;
      let type = xhr && xhr.getResponseHeader('Content-Type') || 'text';
      if (err)
      {
        err = xhr.responseText;
        if (type.match(/json/))
        {
          reject(JSON.parse(xhr.responseText));
        }
        else if (type.match(/text/))
        {
          reject({
            error: xhr.responseText
          });
        }
        else
        {
          reject(err);
        }
      }
      else
      {
        if (type.match(/json/) || (xhr.response && xhr.response.substr(0, 1) === '{'))
        {
          resolve(transform(JSON.parse(xhr.responseText)));
        }
        else if (type.match(/text/))
        {
          resolve(transform(xhr.responseText));
        }
        else
        {
          resolve(transform(xhr.response));
        }
      }
    }


    var req = new XMLHttpRequest();

    function progress(event)
    {
      if (progressCallback)
      {
        progressCallback(event, method + ' ' + url);
      }
    }
    req.addEventListener("progress", progress);
    req.upload && req.upload.addEventListener("progress", progress);

    req.addEventListener("readystatechange", function ()
    {
      if (progressCallback)
      {
        progressCallback(null, method + ' ' + url);
      }
      if (this.readyState == 4)
      {
        if (this.status >= 200 && this.status < 300)
        {
          processResponse(null, this);
        }
        else
        {
          processResponse('ERROR', req);
        }
      }
    });

    req.open(method, url);
    
    for (const [header, value] of Object.entries(headers))
    {
      req.setRequestHeader(header, value);
    }

    if (typeof body === "object" || typeof body === "string")
    {
      if (!(body instanceof FormData))
      {
        req.setRequestHeader("Content-Type", "application/json");
        body = JSON.stringify(body);
      }
    }

    req.send(body || '');
  });
}

export function createRequest()
{
  return request.apply(null, ['POST'].concat(Array.prototype.slice.call(arguments)));
}

export function readRequest()
{
  return request.apply(null, ['GET'].concat(Array.prototype.slice.call(arguments)));
}

export function updateRequest()
{
  return request.apply(null, ['PUT'].concat(Array.prototype.slice.call(arguments)));
}

export function deleteRequest()
{
  return request.apply(null, ['DELETE'].concat(Array.prototype.slice.call(arguments)));
}

export function searchRequest()
{
  return request.apply(null, ['SEARCH'].concat(Array.prototype.slice.call(arguments)));
}

let progressCallback = false;

export function registerProgressCallback(callback)
{
  progressCallback = callback;
}
