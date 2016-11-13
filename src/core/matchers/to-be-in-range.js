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

import {isNumber} from '../util/is-number.js';

/**
 * Check that the tested object is a number greater than a lower bound and less
 * than a lower bound.
 *
 * @param {Object} ctx Test context.
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @return {Object} Test result.
 */
export function toBeInRange(ctx, lower, upper) {
  const actual = ctx.actual;
  return {
    pass: isNumber(actual) && actual > lower && actual < upper,
    message: `Expect ${jasmine.pp(actual)} {{not}} to be between ${jasmine.pp(lower)} and ${jasmine.pp(upper)}`,
  };
}
