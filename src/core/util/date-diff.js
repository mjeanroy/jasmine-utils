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

import {parseDate} from './parse-date.js';

/**
 * Get the difference in milliseconds between two dates.
 *
 * Both parameters does not need to be an instance of Date:
 * - If it is a number, it is assumed that this is a timestamp and it is converted to a date.
 * - If it is a string, it is assumed that this is an ISO format.
 *
 * @param {Date|number|string} d1 First date.
 * @param {Date|number|string} d2 Second date.
 * @return {number} The number of milliseconds between dates.
 */
export function dateDiff(d1, d2) {
  const t1 = parseDate(d1).getTime();
  const t2 = parseDate(d2).getTime();
  return t1 - t2;
}
