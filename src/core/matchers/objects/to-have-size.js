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

import {sizeOf} from '../../util/size-of.js';

/**
 * Check that tested object has an expected size.
 *
 * A size may be computed from:
 * - An array (or an array-like object) with the `length` property.
 * - A `Map` or a `Set` using its `size` property.
 * - Any iterable object (using a `for..of` loop).
 * - An object (number of own enumerable properties).
 *
 * @message Expect size of [actual] (not) to be [expectedSize]
 * @example
 *   expect([1, 2, 3]).toHaveSize(3);
 *   expect('foo bar').toHaveSize(7);
 *   expect(new Set([0, 1, 2])).toHaveSize(3);
 *   expect({ foo: 'bar' }).toHaveSize(1);
 *
 * @param {Object} ctx Test context.
 * @param {number} expectedSize The expected size.
 * @return {Object} Test result.
 * @since 0.1.0
 */
export function toHaveSize({actual, pp}, expectedSize) {
  const size = sizeOf(actual);
  return {
    pass: size === expectedSize,
    message() {
      return `Expect size of ${pp(actual)} {{not}} to be ${pp(expectedSize)} but was ${pp(size)}`;
    },
  };
}
