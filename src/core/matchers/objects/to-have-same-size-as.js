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

import { sizeOf } from '../../util/size-of';

/**
 * Check that tested object has the same size as an other one.
 *
 * A size may be computed from:
 * - An array (or an array-like object) with the `length` property.
 * - A `Map` or a `Set` using its `size` property.
 * - Any iterable object (using a `for..of` loop).
 * - An object (number of own enumerable properties).
 *
 * @message Expect [actual] to have same size as [expected]
 * @example
 *   expect('foo').toHaveSameSizeAs('foo');
 *   expect('bar').toHaveSameSizeAs({ b: 1, a: 1, r: 1 });
 *   expect([ 'foo', 'bar' ]).toHaveSameSizeAs(new Set(['foo', 'bar']));
 *
 * @param {Object} ctx Test context.
 * @param {*} expected The other object (or array, or array-like object).
 * @return {Object} Test result.
 * @since 0.1.0
 */
export function toHaveSameSizeAs({ actual, pp }, expected) {
  const actualSize = sizeOf(actual);
  const expectedSize = sizeOf(expected);
  return {
    pass: actualSize === expectedSize,
    message() {
      return `Expect ${pp(actual)} {{not}} to have same size as ${pp(expected)}`;
    },
  };
}
