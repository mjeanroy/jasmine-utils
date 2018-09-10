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
import {toBeDateCloseToNow} from '../../../src/core/matchers/dates/to-be-date-close-to-now.js';

describe('toBeDateCloseToNow', () => {
  it('should check that object is a date close to "now"', () => {
    const now = new Date().getTime();
    const offset = 10;
    const actual = new Date(now + offset);
    const result = toBeDateCloseToNow({actual});

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect date ${pp(actual)} {{not}} to be close to now`
    );
  });

  it('should check that object is a date close to now with a custom diff', () => {
    const now = new Date().getTime();
    const offset = 2000;
    const actual = new Date(now + offset);
    const result = toBeDateCloseToNow({actual}, offset * 10);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect date ${pp(actual)} {{not}} to be close to now`
    );
  });

  it('should not pass with a date not close to now', () => {
    const now = new Date().getTime();
    const offset = 10000;
    const actual = new Date(now + offset);
    const result = toBeDateCloseToNow({actual});

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect date ${pp(actual)} {{not}} to be close to now`
    );
  });
});
