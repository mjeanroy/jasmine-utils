/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2016 Mickael Jeanroy <mickael.jeanroy@gmail.com>
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

import {isInteger} from '../util/is-integer.js';

/**
 * Check that the tested object is an `integer` value.
 *
 * Note that for this matcher, an `integer` is a numeric value (see `toBeNumeric` matcher) that
 * is not a `float` (a numeric value may be a `number` *or* a `string` containing a number).
 *
 * *JavaScript makes no distinction between integers and floats so
 * both 1 and 1.0 are considered integers.*
 *
 * @message Expect [actual] (not) to be an integer
 * @example
 *   expect(1).toBeInteger();
 *   expect(1.0).toBeInteger();
 *   expect('1').toBeInteger();
 *   expect('1.0').toBeInteger();
 *   expect(1.5).not.toBeInteger();
 *
 * @param {Object} ctx Test context.
 * @return {Object} The test result.
 * @since 0.1.0
 */
export function toBeInteger(ctx) {
  const actual = ctx.actual;
  return {
    pass: isInteger(actual),
    message: `Expect ${jasmine.pp(actual)} {{not}} to be an integer`,
  };
}
