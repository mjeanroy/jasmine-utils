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

import {isArray} from './is-array.js';
import {isFunction} from './is-function.js';
import {isNumber} from './is-number.js';
import {isNodeList} from './is-node-list.js';
import {isDOMElement} from './is-dom-element.js';

/**
 * Check that a given value is an array or an array-like object.
 *
 * An array-like object is an object that can be iterated like an object:
 * - It has a `length` property (and its value is a number).
 * - It has indexed property starting from zero.
 *
 * For example, node list objects are a kind of array-like object.
 *
 * @param {*} obj Value to check.
 * @return {boolean} `true` if `obj` is an array-like object, `false` otherwise.
 */
export function isArrayLike(obj) {
  if (isArray(obj)) {
    return true;
  }

  if (isNodeList(obj)) {
    return true;
  }

  if (isFunction(obj) && obj !== window) {
    return false;
  }

  if (isDOMElement(obj) && obj.length) {
    return true;
  }

  const length = obj.length;
  return length === 0 || isNumber(length) && length > 0 && (length - 1) in obj;
}
