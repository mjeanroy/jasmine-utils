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

/**
 * Apply a predicate function on all the values of an array (also supports array-like
 * objects) and returns an array of all intermediate results.
 *
 * The iteratee function will be called with three arguments:
 *  - `value` The value for the given iteration.
 *  - `index` The index of the value being iterated.
 *  - `array` The array being traversed.
 *
 * @param {Array<*>} array The array to iterate.
 * @param {function} iteratee The iteratee function.
 * @return {Array<*>} Array containing all intermediate results.
 */
export function map(array, iteratee) {
  const results = [];

  for (let i = 0, size = array.length; i < size; ++i) {
    results.push(iteratee.call(null, array[i], i, array));
  }

  return results;
}
