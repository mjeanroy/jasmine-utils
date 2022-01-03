/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2022 Mickael Jeanroy
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import {has} from './has.js';
import {isMap} from './is-map.js';

// Use a fallback for `Object.keys` if needed (for old browsers).
const objectKeys = Object.keys || function _keys(o) {
  const results = [];

  for (const key in o) {
    if (has(o, key)) {
      results.push(key);
    }
  }

  return results;
};

/**
 * Get all keys of map instance.
 *
 * @param {Map} map Map instance.
 * @return {Array<String>} An array of all map keys.
 */
function mapKeys(map) {
  // IE11 on Win10 does not support `keys` function, so
  // use the good old `forEach` function.
  const allKeys = [];
  map.forEach((v, k) => allKeys.push(k));
  return allKeys;
}

/**
 * Get all own and enumerable keys of an object.
 *
 * @param {Object} obj Object to extract keys.
 * @return {Array<string>} An array of all the keys in the object.
 */
export function keys(obj) {
  return isMap(obj) ? mapKeys(obj) : objectKeys(obj);
}
