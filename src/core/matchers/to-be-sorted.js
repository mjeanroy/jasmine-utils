/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2017 Mickael Jeanroy <mickael.jeanroy@gmail.com>
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

import {isArray} from '../util/is-array.js';
import {isSorted} from '../util/is-sorted.js';

/**
 * Check that the tested object is an array and is sorted (i.e for each elements in
 * the array, `array[i - 1] <= array[i]`).
 *
 * A custom comparator can be specified as parameter:
 * - Takes values to compare as arguments.
 * - Must return a number:
 *   - Less than zero if first argument is less than the second.
 *   - Greater than zero if first argument is greater than the second.
 *   - Zero if both parameters are "equivalent".
 *
 * @message Expect [actual] (not) to be sorted
 * @example
 *   expect([0, 1, 2, 3]).toBeSorted();
 *   expect(['bar', 'foo']).toBeSorted();
 *   expect([false, false, true, true]).toBeSorted();
 *   expect([{ id: 1 }, { id: 2 }, { id: 3 }]).toBeSorted((a, b) => a.id - b.id);
 *   expect([1, 0, 2, 3]).not.toBeSorted();
 *
 * @param {Object} ctx Test context.
 * @param {function} comparator Comparator function (optional).
 * @return {Object} Test result.
 * @since 0.1.0
 */
export function toBeSorted(ctx, comparator) {
  const actual = ctx.actual;
  return {
    pass: isArray(actual) && isSorted(actual, comparator),
    message: `Expect ${jasmine.pp(actual)} {{not}} to be sorted`,
  };
}
