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

import {isDate} from './is-date.js';

/**
 * Check that both dates are the same day (do not compare hours, minutes, etc.).
 *
 * @param {Date|number|string} date1 First date.
 * @param {Date|number|string} date2 Second date.
 * @return {boolean} `true` if both dates are the same day, `false` otherwise.
 */
export function isSameDay(date1, date2) {
  const d1 = isDate(date1) ? date1 : new Date(date1);
  const d2 = isDate(date2) ? date2 : new Date(date2);
  const isSameYear = d1.getFullYear() === d2.getFullYear();
  const isSameMonth = d1.getMonth() === d2.getMonth();
  const isSameDate = d1.getDate() === d2.getDate();
  return isSameYear && isSameMonth && isSameDate;
}
