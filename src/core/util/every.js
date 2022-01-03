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

import {isArrayLike} from './is-array-like.js';
import {isSet} from './is-set.js';
import {isMap} from './is-map.js';
import {isIterable} from './is-iterable.js';

/**
 * Check that a predicate satisfies each elements in an array, or an
 * array-like object (such as a string, an `arguments` object, etc.).
 *
 * If the array is empty, this function will returns `true`.
 *
 * @param {array|string|object} array Array "like" object.
 * @param {function} predicate The predicate function.
 * @return {boolean} `true` if the predicate function returns `true` for each elements, `false` otherwise.
 */
function arrayEvery(array, predicate) {
  for (let i = 0, size = array.length; i < size; ++i) {
    if (!predicate.call(null, array[i], i, array)) {
      return false;
    }
  }

  return true;
}

/**
 * Check that a predicate satisfies each elements in an iterable object (an object
 * that can be iterated with the `for...of` loop such as `Set`, `Map` or objects
 * containing an `iterator` function).
 *
 * If the iterable is empty, this function will returns `true`.
 *
 * @param {object} iterable Iterable object.
 * @param {function} predicate The predicate function.
 * @return {boolean} `true` if the predicate function returns `true` for each elements, `false` otherwise.
 */
function iterableEvery(iterable, predicate) {
  let i = 0;

  for (const value of iterable) {
    if (!predicate.call(undefined, value, i, iterable)) {
      return false;
    }

    i++;
  }

  return true;
}

/**
 * Check that a predicate satisfies each elements in a `Set` or a `Map`.
 * If the map or the set is empty, this function will returns `true`.
 *
 * @param {Map|Set} mapOrSet Iterable object.
 * @param {function} predicate The predicate function.
 * @return {boolean} `true` if the predicate function returns `true` for each elements, `false` otherwise.
 */
function mapOrSetEvery(mapOrSet, predicate) {
  let hasFalse = false;

  mapOrSet.forEach(function(v, k) {
    // Be careful, `forEach` function on Safari miss the second parameter when
    // iterating over a `Set`...
    hasFalse = hasFalse || !predicate.call(undefined, v, arguments.length === 1 ? v : k, mapOrSet);
  });

  return !hasFalse;
}

/**
 * Check that a predicate satisfies each elements in an array or an iterable
 * structure.
 *
 * This function supports:
 * - Array.
 * - Array-Like objects.
 * - Map instances.
 * - Set instances.
 * - Any iterable objects.
 *
 * The predicate function will be called with three arguments:
 *  - `value` The value for the given iteration.
 *  - `key` The key of the value being iterated.
 *  - `array` The array being traversed.
 *
 * Note that the key may be different with arrays and map/set:
 * - With an array or an iterable object, the key will be the index of the value being traversed.
 * - With a map, the key will be the index value of the value being traversed.
 * - With a set, the key will be the same value being traversed (since a `Set` does not have any keys).
 *
 * See the documentation of the `forEach` functions of `Map` and `Set` structure.
 *
 * @param {Array|Map|Set} collection The collection to iterate.
 * @param {function} predicate The predicate function.
 * @return {boolean} `true` if the predicate returns a truthy value for each element
 *                   in the array, `false` otherwise.
 */
export function every(collection, predicate) {
  // First, test with an array.
  if (isArrayLike(collection)) {
    return arrayEvery(collection, predicate);
  }

  if (isSet(collection) || isMap(collection)) {
    return mapOrSetEvery(collection, predicate);
  }

  // Then, try with iterable (object with iterator function).
  if (isIterable(collection)) {
    return iterableEvery(collection, predicate);
  }

  return true;
}
