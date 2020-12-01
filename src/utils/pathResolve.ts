


// path.resolve([from ...], to)
// posix version

import _ from 'lodash';

function normalizeArray(parts: string | any[], allowAboveRoot: boolean) {
  const res = [];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];

    // ignore empty parts
    if (!p || p === '.')
      continue;

    if (p === '..') {
      if (res.length && res[res.length - 1] !== '..') {
        res.pop();
      } else if (allowAboveRoot) {
        res.push('..');
      }
    } else {
      res.push(p);
    }
  }

  return res;
}

/**
 * https://github.com/jinder/path/blob/master/path.js
 * @param args
 */
export const resolve = (...args: any[]) =>  {
  let resolvedPath = '', resolvedAbsolute = false;

  for (let i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    const path = (i >= 0) ? args[i] : '';

    // Skip empty and invalid entries
    if (!_.isString(path)) {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path[0] === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(resolvedPath.split('/'),
    !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};
