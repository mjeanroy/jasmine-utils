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

import {isFiniteNumber} from '../../util/is-finite-number.js';

/**
 * Check that the tested object is a finite number.
 *
 * **Important:** This matcher does not convert the tested object to a number, but
 * returns the equivalent of `Number.isFinite` function.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite
 *
 * @message Expect [actual] (not) to be finite number
 * @example
 *   expect(1).toBeFiniteNumber();
 *   expect(1.0).toBeFiniteNumber();
 *   expect('1').not.toBeFiniteNumber();
 *   expect(NaN).not.toBeFiniteNumber();
 *   expect(Infinity).not.toBeFiniteNumber();
 *   expect(-Infinity).not.toBeFiniteNumber();
 *   expect(null).not.toBeFiniteNumber();
 *
 * @param {Object} ctx Test context.
 * @return {Object} The test result.
 * @since 0.5.0
 */
export function toBeFiniteNumber({actual, pp}) {
  return {
    pass: isFiniteNumber(actual),
    message() {
      return `Expect ${pp(actual)} {{not}} to be finite number`;
    },
  };
}
