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

import { strictEquals } from './strict-equals';

/**
 * Count the number of occurences of a value inside an array.
 *
 * @param {Array<*>} array Array to traverse.
 * @param {*} occ Value to count.
 * @param {number } from Index to start (default is zero).
 * @param {function} equalsFunction The comparison function (defaults is the strict equality).
 * @return {number} The number of time `occ` is in the array.
 */
export function countIn(array, occ, from = 0, equalsFunction = strictEquals) {
  const size = array.length;

  let count = 0;
  for (let i = from; i < size; ++i) {
    if (equalsFunction(array[i], occ)) {
      count++;
    }
  }

  return count;
}
