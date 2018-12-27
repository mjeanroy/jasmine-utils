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

import {strictEquals} from './strict-equals.js';

/**
 * Get the (first) index of given value inside an array (also supports array-like objects).
 *
 * This function may take as third argument a custom equality function used to
 * compare values in the array with the value to look for. If not specified, the
 * strict equality will be used (i.e result of `===`).
 *
 * @param {Array<*>} array Array to check.
 * @param {*} obj Value to look for in the array.
 * @param {function} equalsFunction A custom equality function used to compare values.
 * @return {number} The index of the value in the array, or -1 if value is not found.
 */
export function indexOf(array, obj, equalsFunction) {
  const areEquals = equalsFunction || strictEquals;
  const size = array.length;

  for (let i = 0; i < size; ++i) {
    if (areEquals(array[i], obj)) {
      return i;
    }
  }

  return -1;
}
