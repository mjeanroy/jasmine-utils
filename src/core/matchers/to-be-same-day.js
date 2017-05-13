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

import {pp} from '../jasmine/pp.js';
import {parseDate} from '../util/parse-date.js';
import {isSameDay} from '../util/is-same-day.js';

/**
 * Check that the tested object is the same *day* as an other date.
 *
 * The tested date and the date to compare may be:
 * - A date instance.
 * - A timestamp.
 * - A string that can be parsed with the `Date` constructor (i.e `new Date('2016-01-01')`).
 *
 * **Note:** Using date strings should be avoided due to browser differences and inconsistencies.
 *
 * @message Expect [actual] (not) the same day as [day]
 * @example
 *   const date1 = new Date(2014, 5, 5, 10, 0, 0, 0);
 *   const date2 = new Date(2014, 5, 5, 15, 0, 0, 0);
 *   const date3 = new Date(2014, 5, 6, 10, 0, 0, 0);
 *
 *   expect(date1).toBeSameDay(date2);
 *   expect(date1).not.toBeSameDay(date3);
 *
 * @param {Object} ctx Test context.
 * @param {Date|number|string} day The other date.
 * @return {Object} Test result.
 * @since 0.1.0
 */
export function toBeSameDay(ctx, day) {
  const actual = ctx.actual;
  const d1 = parseDate(actual);
  const d2 = parseDate(day);
  return {
    pass: isSameDay(d1, d2),
    message: `Expect date ${pp(d1)} {{not}} to be same day as ${pp(d2)}`,
  };
}
