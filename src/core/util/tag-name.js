/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2017 Mickael Jeanroy
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

import {isNull} from './is-null.js';
import {isUndefined} from './is-undefined.js';

/**
 * Return the tag name of the object (a.k.a the result of `Object.prototype.toString`).
 *
 * @param {*} obj Object to get tag name.
 * @return {string} Tag name.
 */
export function tagName(obj) {
  // Handle null and undefined since it may fail on some browser.

  if (isNull(obj)) {
    return '[object Null]';
  }

  if (isUndefined(obj)) {
    return '[object Undefined]';
  }

  const tag = Object.prototype.toString.call(obj);

  // IE11 on Win10 returns `[object Object]` with `Map` and `Set`.
  // Try to patch this bug and return the appropriate tag value.
  // The best way seems to compare the constructor source with `Map` or `Set` sources.
  if (tag === '[object Object]') {
    const src = typeof obj.constructor === 'function' ? toSource(obj.constructor) : '';
    if (typeof Map === 'function' && src === toSource(Map)) {
      return '[object Map]';
    } else if (typeof Set === 'function' && src === toSource(Set)) {
      return '[object Set]';
    }
  }

  return tag;
}

/**
 * Get the function source of parameter.
 *
 * @param {*} obj Parameter to get source.
 * @return {string} Function source.
 */
function toSource(obj) {
  return Function.prototype.toString.call(obj);
}
