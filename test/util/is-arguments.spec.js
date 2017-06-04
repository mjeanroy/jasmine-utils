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

import {isArguments} from 'src/core/util/is-arguments.js';

describe('isDate', () => {
  it('should returns true if object is the arguments', () => {
    // eslint-disable-next-line require-jsdoc
    function tst() {
      // eslint-disable-next-line prefer-rest-params
      return isArguments(arguments);
    };

    expect(tst()).toBe(true);
  });

  it('should return false if object is not an arguments object', () => {
    expect(isArguments(true)).toBe(false);
    expect(isArguments(0)).toBe(false);
    expect(isArguments({})).toBe(false);
    expect(isArguments(() => {})).toBe(false);
    expect(isArguments(null)).toBe(false);
    expect(isArguments(undefined)).toBe(false);
  });
});
