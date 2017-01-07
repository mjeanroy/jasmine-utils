/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2016 Mickael Jeanroy <mickael.jeanroy@gmail.com>
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

/**
 * Get all values of object.
 * This function also support `Map` instances.
 *
 * @param {Map|Object} obj The object.
 * @return {Array<*>} Array of all values.
 */
export function values(obj) {
  return isMap(obj) ? mapValues(obj) : objectValues(obj);
}

/**
 * Get all object values.
 *
 * @param {Object} obj Object.
 * @return {Array<*>} Object values.
 */
function objectValues(obj) {
  const vals = [];

  for (let i in obj) {
    if (has(obj, i)) {
      vals.push(obj[i]);
    }
  }

  return vals;
}

/**
 * Get all map values.
 *
 * @param {Map} map Map instance.
 * @return {Array<*>} Map values.
 */
function mapValues(map) {
  // IE11 on Win10 does not support `keys` function, so
  // use the good old `forEach` function.
  const allValues = [];
  map.forEach((x) => allValues.push(x));
  return allValues;
}
