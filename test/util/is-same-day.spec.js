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

import { isSameDay } from '../../src/core/util/is-same-day';

describe('isSameDay', () => {
  it('should return true if both dates are the same day', () => {
    const d1 = new Date(2016, 10, 10, 10, 0, 0, 0);
    const d2 = new Date(2016, 10, 10, 11, 0, 0, 0);
    expect(isSameDay(d1, d2)).toBe(true);
  });

  it('should return true if both timestamps are the same day', () => {
    const d1 = new Date(2016, 10, 10, 10, 0, 0, 0);
    const d2 = new Date(2016, 10, 10, 11, 0, 0, 0);
    expect(isSameDay(d1.getTime(), d2.getTime())).toBe(true);
  });

  it('should return true if both ISO string are the same day', () => {
    const d1 = '2016-10-10T10:00:00.000Z';
    const d2 = '2016-10-10T11:00:00.000Z';
    expect(isSameDay(d1, d2)).toBe(true);
  });

  it('should return false if dates are not the same day', () => {
    const d1 = new Date(2016, 10, 10, 10, 0, 0, 0);
    const d2 = new Date(2016, 10, 11, 10, 0, 0, 0);
    expect(isSameDay(d1, d2)).toBe(false);
  });
});
