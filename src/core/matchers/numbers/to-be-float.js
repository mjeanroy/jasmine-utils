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

import { isFloat } from '../../util/is-float';

/**
 * Check that the tested object is a `float` value.
 *
 * Note that for this matcher, a `float` is a numeric value (see `toBeNumeric` matcher) that
 * is not an integer (a numeric value may be a `number` *or* a `string` containing a number).
 *
 * *JavaScript makes no distinction between integers and floats
 * so 1.0 is considered integer.*
 *
 * @message Expect [actual] (not) to be a float
 * @example
 *   expect(1.5).toBeFloat();
 *   expect('1.5').toBeFloat();
 *   expect(1).not.toBeFloat();
 *   expect(1.0).not.toBeFloat();
 *
 * @param {Object} ctx Test context.
 * @return {Object} The test result.
 * @since 0.1.0
 */
export function toBeFloat({ actual, pp }) {
  return {
    pass: isFloat(actual),
    message() {
      return `Expect ${pp(actual)} {{not}} to be a float`;
    },
  };
}
