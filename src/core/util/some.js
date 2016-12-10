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

import {isArrayLike} from './is-array-like.js';
import {isIterable} from './is-iterable.js';

/**
 * Check that a predicate satisfies at least one element in an array (or an
 * array-like object such as a string or the `arguments` object).
 *
 * The predicate function will be called with three arguments:
 *  - `value` The value for the given iteration.
 *  - `index` The index of the value being iterated.
 *  - `array` The array being traversed.
 *
 * @param {Array|string} array The array to iterate.
 * @param {function} predicate The predicate function.
 * @return {boolean} `true` if the predicate returns a truthy value for at least one, `false` otherwise.
 */
function arraySome(array, predicate) {
  for (let i = 0, size = array.length; i < size; ++i) {
    if (predicate.call(null, array[i], i, array)) {
      return true;
    }
  }

  return false;
}

/**
 * Check that a predicate satisfies at least one element in an iterable object (such
 * as a set, a map or any iterable object).
 *
 * The predicate function will be called with three arguments:
 *  - `value` The value for the given iteration.
 *  - `index` The index of the value being iterated.
 *  - `iterable` The iterable being traversed.
 *
 * @param {object} iterable The iterable to iterate.
 * @param {function} predicate The predicate function.
 * @return {boolean} `true` if the predicate returns a truthy value for at least one, `false` otherwise.
 */
function iterableSome(iterable, predicate) {
  let i = 0;

  for (const value of iterable) {
    if (predicate.call(null, value, i, iterable)) {
      return true;
    }

    i++;
  }

  return false;
}

/**
 * Check that a predicate satisfies at least one element in a collection (array,
 * set, map or an any iterable object).
 *
 * The predicate function will be called with three arguments:
 *  - `value` The value for the given iteration.
 *  - `index` The index of the value being iterated.
 *  - `collection` The collection being traversed.
 *
 * @param {Array|string|object} collection The collection to iterate.
 * @param {function} predicate The predicate function.
 * @return {boolean} `true` if the predicate returns a truthy value for at least one, `false` otherwise.
 */
export function some(collection, predicate) {
  if (isArrayLike(collection)) {
    return arraySome(collection, predicate);
  }

  if (isIterable(collection)) {
    return iterableSome(collection, predicate);
  }

  return false;
}
