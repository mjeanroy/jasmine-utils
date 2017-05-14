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

import {pp} from '../jasmine/pp.js';
import {isArray} from '../util/is-array.js';
import {isObject} from '../util/is-object.js';
import {every} from '../util/every.js';

/**
 * Check that the tested object is partially equals to a second one.
 * Note that this matcher works fine with custom equality matchers.
 *
 * @message Expect [actual] (not) to be partially equal to [other]
 * @example
 *   const a1 = { id: 1, foo: 'bar' };
 *   const a2 = { id: 2, foo: 'bar' };
 *
 *   const b1 = { id: 1 };
 *   const b2 = { id: 2 };
 *
 *   const c1 = { id: 2 };
 *   const c2 = { id: 2 };
 *
 *   const array1 = [a1, a2];
 *   const array2 = [b1, b2];
 *   const array3 = [c1, c2];
 *   expect(array1).toBePartiallyEqualTo(array2);
 *   expect(array1).not.toBePartiallyEqualTo(array3);
 *
 * @param {Object} ctx Test context.
 * @param {Array<*>|Object} other The second object to use for equality.
 * @return {Object} Test result.
 * @since 0.1.0
 */
export function toBePartiallyEqualTo({actual, equals}, other) {
  let pass = false;

  if (isArray(other) && isArray(actual)) {
    pass = checkArray(actual, other, equals);
  } else if (isObject(other) && isObject(actual)) {
    pass = checkObject(actual, other, equals);
  }

  return {
    pass: pass,
    message: `Expect ${pp(actual)} {{not}} to be partially equal to ${pp(other)}`,
  };
}

/**
 * Check that two array are equals, using a partial comparison between
 * values in array.
 *
 * @param {Array<*>} a First array.
 * @param {Array<*>} b Second array.
 * @param {function} equalsFunction The equality function.
 * @return {boolean} `true` if first array is partially equals to second array.
 */
function checkArray(a, b, equalsFunction) {
  if (a.length !== b.length) {
    return false;
  }

  return every(b, function(current, i) {
    return equalsFunction(a[i], jasmine.objectContaining(current));
  });
}

/**
 * Check that two objects are equals, using a partial comparison between
 * objects.
 *
 * @param {Array<*>} a First object.
 * @param {Array<*>} b Second object.
 * @param {function} equalsFunction The equality function.
 * @return {boolean} `true` if first object is partially equals to second object.
 */
function checkObject(a, b, equalsFunction) {
  return equalsFunction(a, jasmine.objectContaining(b));
}
