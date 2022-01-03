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
 * Check that tested object is empty:
 * - If it is an `array` or an array-like, check that the length is equal to zero.
 * - If it is an object, check that it does not have any property.
 * - If it is a `map` or a `set`, check that the size is equal to zero.
 *
 * @message Expect [actual] (not) to be empty.
 * @example
 *   expect('').toBeEmpty();
 *   expect([]).toBeEmpty();
 *   expect({}).toBeEmpty();
 *   expect(new Map()).toBeEmpty();
 *   expect(new Set()).toBeEmpty();
 *
 * @param {Object} ctx Test context.
 * @return {Object} Test result.
 * @since 0.1.0
 */
export function toBeEmpty({actual, pp}) {
  const size = sizeOf(actual);
  return {
    pass: size === 0,
    message() {
      return `Expect ${pp(actual)} {{not}} to be empty`;
    },
  };
}
