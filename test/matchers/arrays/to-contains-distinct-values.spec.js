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

import {toContainsDistinctValues} from 'src/core/matchers/arrays/to-contains-distinct-values.js';

describe('toContainsDistinctValues', () => {
  it('should check that array only contains distinct values', () => {
    const actual = [-1, 0, 1];
    const result = toContainsDistinctValues({actual});
    expect(result).toEqual({
      pass: true,
      message: `Expect [ -1, 0, 1 ] {{not}} to contains only distinct values`,
    });
  });

  it('should not pass if array contains duplicates', () => {
    const actual = [1, 0, 1];
    const result = toContainsDistinctValues({actual});
    expect(result).toEqual({
      pass: false,
      message: `Expect [ 1, 0, 1 ] {{not}} to contains only distinct values`,
    });
  });

  it('should not pass if array contains duplicates with custom equality function', () => {
    const actual = [-1, 0, 1];
    const equals = jasmine.createSpy('equals').and.callFake((a, b) => {
      return Math.abs(a) === Math.abs(b);
    });

    const result = toContainsDistinctValues({actual, equals});

    expect(result).toEqual({
      pass: false,
      message: `Expect [ -1, 0, 1 ] {{not}} to contains only distinct values`,
    });
  });
});
