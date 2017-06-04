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

import {pp} from '../../../src/core/jasmine/pp.js';
import {toBeDateCloseTo} from '../../../src/core/matchers/dates/to-be-date-close-to.js';

describe('toBeADateCloseTo', () => {
  it('should check that object is a date close to an other date', () => {
    const actual = new Date(2016, 10, 12, 17, 55, 38, 0);
    const other = new Date(2016, 10, 12, 17, 55, 38, 100);
    const result = toBeDateCloseTo({actual}, other);
    expect(result).toEqual({
      pass: true,
      message: `Expect date ${pp(actual)} {{not}} to be close to ${pp(other)}`,
    });
  });

  it('should check that object is a date close to an other date with a custom diff', () => {
    const actual = new Date(2016, 10, 12, 17, 55, 38, 0);
    const other = new Date(2016, 10, 12, 17, 55, 39, 0);
    const result = toBeDateCloseTo({actual}, other, 10000);
    expect(result).toEqual({
      pass: true,
      message: `Expect date ${pp(actual)} {{not}} to be close to ${pp(other)}`,
    });
  });

  it('should not pass with a date not close', () => {
    const actual = new Date(2016, 10, 12, 17, 55, 38, 11);
    const other = new Date(2016, 10, 12, 17, 55, 38, 0);
    const result = toBeDateCloseTo({actual}, other, 10);
    expect(result).toEqual({
      pass: false,
      message: `Expect date ${pp(actual)} {{not}} to be close to ${pp(other)}`,
    });
  });
});
