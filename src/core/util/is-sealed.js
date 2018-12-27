/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2018 Mickael Jeanroy
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

import {isFunction} from './is-function.js';
import {isPrimitive} from './is-primitive.js';

/**
 * Check that a given value is sealed: an object is sealed if it is not
 * extensible and if all its properties are non-configurable and therefore not
 * removable (but not necessarily non-writable).
 *
 * This function use internally `Object.isSealed` (supported in Chrome, Firefox,
 * Safari and IE >= 9). If `Object.isSealed` is not supported, this function
 * returns `false`.
 *
 * **Important**: This function (as ES6 specification) treat primitive
 * (`null`, `undefined`, numbers, strings and booleans) as sealed object.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
 *
 * @param {*} obj Value to check.
 * @return {boolean} `true` if `obj` is sealed, `false` otherwise.
 */
export function isSealed(obj) {
  // Primitive values are frozen in ES6 (not in ES5).
  if (isPrimitive(obj)) {
    return true;
  }

  // If Object.sealed is not supported, return `false` by default.
  if (!isFunction(Object.isSealed)) {
    return false;
  }

  return Object.isSealed(obj);
}
