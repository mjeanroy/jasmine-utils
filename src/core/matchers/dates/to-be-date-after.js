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

import {dateDiff} from '../../util/date-diff.js';

/**
 * Check that the tested date object is a date "after" an other date.
 *
 * The tested date and the date to compare may be:
 * - A date instance.
 * - A timestamp.
 * - A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).
 *
 * **Note:** Using date strings should be avoided due to browser differences and inconsistencies.
 *
 * @message Expect date [actual] (not) to be after [lower]
 * @example
 *   expect(Date.now()).toBeDateAfter(Date.now() - 1000));
 *   expect(Date.now() - 1000).toBeDateAfter(Date.now()));
 *
 * @param {Object} ctx Test context.
 * @param {Date|number|string} lower The lower bound.
 * @return {Object} The test result.
 * @since 0.1.0
 */
export function toBeDateAfter({actual, pp}, lower) {
  const diff = dateDiff(actual, lower);
  return {
    pass: diff >= 0,
    message() {
      return `Expect date ${pp(actual)} {{not}} to be after ${pp(lower)}`;
    },
  };
}
