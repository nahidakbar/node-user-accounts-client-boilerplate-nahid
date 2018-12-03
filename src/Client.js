"use strict";

import
{
  endpoint
}
from "./helper/endpoint"
import
{
  readRequest,
  createRequest,
  updateRequest,
  deleteRequest
}
from "./helper/request"

/**
 * Authentication Client
 */
export class Client
{
  constructor(options = {})
  {
    this.prefix = options.prefix || 'api/accounts';
    this.endpoint = endpoint(this.prefix);
  }

  currentUser()
  {
    return readRequest(this.endpoint('current'));
  }

  updateCurrentUser(update)
  {
    return updateRequest(this.endpoint('current'), update);
  }

  isLoggedIn()
  {
    return new Promise((resolve, reject) =>
    {
      this.currentUser()
        .then(current =>
        {
          if (!current)
          {
            resolve(false);
          }
          else
          {
            resolve(true);
          }
        }, reject);
    });
  }

  loginMethods()
  {
    return readRequest(this.endpoint('methods'));
  }

  login(method, parameters)
  {
    console.log(method, parameters);
    if (method.redirect)
    {
      window.location = this.endpoint(method.method, 'login');
    }
    else
    {
      return createRequest(this.endpoint(method.method, 'login'), parameters);
    }
  }

  loginPasswordless(method, parameters, mode='passwordless')
  {
    console.log(method, parameters);
    return createRequest(this.endpoint(method.method, mode), parameters);
  }

  logout()
  {
    return readRequest(this.endpoint('logout'));
  }

  createUser(credentialType, credentialValue)
  {
    return createRequest(this.endpoint('new'), {
      type: credentialType,
      value: credentialValue
    });
  }

  searchUsers(options = {})
  {
    return readRequest(this.endpoint('search') + '?' + Object.keys(options)
      .map(x => `${x}=${options[x]}`)
      .join('&'));
  }

  readUser(id)
  {
    return readRequest(this.endpoint(id));
  }

  updateUser(id, update)
  {
    return updateRequest(this.endpoint(id), update);
  }

  deleteUser(id)
  {
    return deleteRequest(this.endpoint(id));
  }

  fields()
  {
    return readRequest(this.endpoint('fields'));
  }
}
