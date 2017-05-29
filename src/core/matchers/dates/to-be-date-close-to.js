/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2017 Mickael Jeanroy
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

import {pp} from '../../jasmine/pp.js';
import {dateDiff} from '../../util/date-diff.js';

/**
 * Check that the tested date object and an actual date object are close.
 *
 * By default, the difference in milliseconds between both dates must not exceed 1000ms,
 * but the last parameter may be set to increase/decrease this value.
 *
 * The tested date and the date to compare may be:
 * - A date instance.
 * - A timestamp.
 * - A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).
 *
 * **Note:** Using date strings should be avoided due to browser differences and inconsistencies.
 *
 * @message Expect date [actual] (not) to be close to [date]
 * @example
 *   expect(new Date(1995, 1, 1, 10, 0, 0, 0)).toBeDateCloseTo(new Date(1995, 1, 1, 10, 0, 0, 500));
 *   expect(new Date(1995, 1, 1, 10, 0, 0, 0)).toBeDateCloseTo(new Date(1995, 1, 1, 10, 0, 0, 500), 1000);
 *   expect(new Date(1995, 1, 1, 10, 0, 0, 0)).toBeDateCloseTo(new Date(1995, 1, 1, 10, 0, 0, 500), 100);
 *
 * @param {Object} ctx Test context.
 * @param {Date|number|string} date The second date to compare with.
 * @param {number} max The maximum difference in milliseconds between both dates, default to 1000.
 * @return {Object} The test result.
 * @since 0.1.0
 */
export function toBeDateCloseTo({actual}, date, max = 1000) {
  const diff = Math.abs(dateDiff(actual, date));
  return {
    pass: diff <= max,
    message: `Expect date ${pp(actual)} {{not}} to be close to ${pp(date)}`,
  };
}
