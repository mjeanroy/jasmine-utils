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

import {parseDate} from '../../src/core/util/parse-date.js';

describe('parseDate', () => {
  it('should return a Date', () => {
    const d = new Date();
    expect(parseDate(d)).toBe(d);
  });

  it('should return new Date initialized with timestamp', () => {
    const d = new Date(2017, 0, 1, 10, 0, 0, 0);
    const tt = d.getTime();
    const result = parseDate(tt);
    expect(result).toEqual(d);
  });

  it('should return new Date initialized with ISO 8601 format', () => {
    const year = '2017';
    const month = '01';
    const day = '01';
    const hours = '10';
    const minutes = '00';
    const seconds = '00';
    const millis = '000';
    const tz = 'Z';

    const iso8601 = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${millis}${tz}`;
    const result = parseDate(iso8601);

    const expectedDate = new Date();
    expectedDate.setTime(Date.UTC(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hours),
        Number(minutes),
        Number(seconds),
        Number(millis)
    ));

    expect(result).toEqual(expectedDate);
  });

  it('should return new Date initialized with ISO 8601 format using specific tz', () => {
    const year = '2017';
    const month = '01';
    const day = '01';
    const hours = '10';
    const minutes = '00';
    const seconds = '00';
    const millis = '000';

    const hOffset = '01';
    const mOffset = '30';
    const tz = `+${hOffset}:${mOffset}`;

    const iso8601 = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${millis}${tz}`;
    const result = parseDate(iso8601);

    const expectedDate = new Date();
    expectedDate.setTime(Date.UTC(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hours) - Number(hOffset),
        Number(minutes) - Number(mOffset),
        Number(seconds),
        Number(millis)
    ));

    expect(result).toEqual(expectedDate);
  });
});
