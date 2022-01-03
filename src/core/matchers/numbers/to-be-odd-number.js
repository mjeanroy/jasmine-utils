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

import {isNumber} from '../../util/is-number.js';

/**
 * Check that the tested object is an odd number.
 *
 * @message Expect [actual] (not) to be an odd number
 * @example
 *   expect(1).toBeOddNumber();
 *   expect(2).not.toBeOddNumber();
 *   expect(0).not.toBeOddNumber();
 *
 * @param {Object} ctx Test context.
 * @return {Object} Test result.
 * @since 0.1.0
 */
export function toBeOddNumber({actual, pp}) {
  return {
    pass: isNumber(actual) && actual % 2 !== 0,
    message() {
      return `Expect ${pp(actual)} {{not}} to be an odd number`;
    },
  };
}
