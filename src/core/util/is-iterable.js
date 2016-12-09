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

import {isNil} from './is-nil.js';
import {isArray} from './is-array.js';
import {isString} from './is-string.js';
import {isMap} from './is-map.js';
import {isSet} from './is-set.js';
import {isFunction} from './is-function.js';

/**
 * Check that a given value is iterable (i.e can be iterated with for...of).
 *
 * @param {*} value Value to check.
 * @return {boolean} `true` if `value` is iterable, `false` otherwise.
 */
export function isIterable(value) {
  // Handle null and undefined.
  if (isNil(value)) {
    return false;
  }

  // All these types are iterable objects.
  if (isArray(value) || isString(value) || isSet(value) || isMap(value)) {
    return true;
  }

  // We must check for the iterator method.
  return !!Symbol && isFunction(value[Symbol.iterator]);
}
