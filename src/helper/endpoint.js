export function endpoint(prefix = '/', format = '.json')
{
  return function ()
  {
    let path = prefix;
    for (let x = 0; x < arguments.length; x++)
    {
      path += '/' + arguments[x];
    }
    return path + format;
  }
}
