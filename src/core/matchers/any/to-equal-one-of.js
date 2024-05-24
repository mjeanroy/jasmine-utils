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

import { contains } from '../../util/contains';

/**
 * Check that the tested object is equal to one of the values in an array.
 * Note that this matcher use the deep equality check and also works with
 * custom equality tester. For strict comparison (`===`) please use `toBeOneOf`.
 *
 * @message Expect [actual] (not) to equal one of [values]
 * @example
 *   expect(1).toEqualOneOf([1, 2, 3]);
 *   expect({id: 1}).toEqualOneOf([{id: 1}]);
 *   expect(10).not.toEqualOneOf([1, 2, 3]);
 *
 * @param {Object} ctx The test context.
 * @param {Array} array The array that should contains the actual value.
 * @return {Object} The test result.
 * @since 0.5.0
 */
export function toEqualOneOf({ actual, equals, pp }, array) {
  return {
    pass: contains(array, actual, equals),
    message() {
      return `Expect ${pp(actual)} {{not}} to equal one of ${pp(array)}`;
    },
  };
}
