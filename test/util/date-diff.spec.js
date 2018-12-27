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

import {dateDiff} from '../../src/core/util/date-diff.js';

describe('dateDiff', () => {
  it('should compute the difference between two dates', () => {
    const d1 = new Date(2016, 10, 10, 17, 0, 0, 0);
    const d2 = new Date(2016, 10, 10, 17, 10, 0, 0);
    const diff = dateDiff(d1, d2);
    expect(diff).toBe(-600000);
  });

  it('should compute the difference between two timestamp', () => {
    const d1 = 60000;
    const d2 = 65000;
    const diff = dateDiff(d1, d2);
    expect(diff).toBe(-5000);
  });

  it('should compute the difference between two ISO string', () => {
    const d1 = '2016-11-10T10:00:00.000Z';
    const d2 = '2016-11-10T10:10:00.000Z';
    const diff = dateDiff(d1, d2);
    expect(diff).toBe(-600000);
  });
});
