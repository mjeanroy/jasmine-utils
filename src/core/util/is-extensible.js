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

import { isFunction } from './is-function';
import { isPrimitive } from './is-primitive';

/**
 * Check that a given value is extensible.
 *
 * Objects are extensible by default: they can have new properties added to them,
 * and can be modified. An object can be marked as non-extensible using:
 * - `Object.preventExtensions()`,
 * - `Object.seal()`,
 * - `Object.freeze()`
 *
 * This function use internally `Object.isExtensible` (supported in Chrome, Firefox,
 * Safari and IE >= 9). If `Object.isExtensible` is not supported, this function
 * returns `false`.
 *
 * **Important**: This function (as ES6 specification) treat primitive
 * (`null`, `undefined`, numbers, strings and booleans) as non extensible object.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
 *
 * @param {*} obj Value to check.
 * @return {boolean} `true` if `obj` is extensible, `false` otherwise.
 */
export function isExtensible(obj) {
  // Primitive values are frozen in ES6 (not in ES5).
  if (isPrimitive(obj)) {
    return false;
  }

  // If Object.isExtensible is not supported, return `true` by default.
  if (!isFunction(Object.isExtensible)) {
    return true;
  }

  return Object.isExtensible(obj);
}
