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

import {pp} from '../jasmine/pp.js';
import {isArray} from '../util/is-array.js';
import {isObject} from '../util/is-object.js';
import {every} from '../util/every.js';

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

/**
 * Check that the tested object is partially equals to a second one.
 *
 * @param {Object} ctx Test context.
 * @param {Array<*>|Object} other The second object to use for equality.
 * @return {Object} Test result.
 */
export function toBePartiallyEqualTo(ctx, other) {
  const {actual, equals} = ctx;

  let pass = false;

  if (isArray(other) && isArray(actual)) {
    pass = checkArray(actual, other, equals);
  } else if (isObject(other) && isObject(actual)) {
    pass = checkObject(actual, other, equals);
  }

  return {
    pass: pass,
    message: pp('Expect {{%0}} {{not}} to be partially equal to {{%1}}', actual, other),
  };
}
