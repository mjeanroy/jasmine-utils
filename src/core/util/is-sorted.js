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

/**
 * Default comparison function.
 *
 * @param {*} a First value to compare.
 * @param {*} b Second value to compare.
 * @return {number} -1 if `a < b`, 1 if `a > b`, otherwise zero.
 */
function defaultComparator(a, b) {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

/**
 * Check that a given array is sorted (according to a given comparator function).
 *
 * The comparator function takes two arguments `a` and `b` and must return:
 * - A value less than 0 if `a < b`.
 * - A value greater than 0 if `a > b`.
 * - Otherwise zero.
 *
 * The comparator function is optional: the default is the default comparison in JS.
 *
 * @param {Array<any>} array Array to check.
 * @param {function} comparator Comparator function.
 * @return {boolean} `true` if `array` is sorted, `false` otherwise.
 */
export function isSorted(array, comparator) {
  if (array.length <= 1) {
    return true;
  }

  const fn = comparator || defaultComparator;

  for (let i = 1, size = array.length; i < size; ++i) {
    if (fn(array[i - 1], array[i]) > 0) {
      return false;
    }
  }

  return true;
}
