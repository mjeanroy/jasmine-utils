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

import {containsDistinct} from 'src/core/util/contains-distinct.js';

describe('containsDistinct', () => {
  it('should return true if array contains only distinct values', () => {
    expect(containsDistinct([0, 1, 2, 3])).toBe(true);
  });

  it('should return false if array contains same values', () => {
    expect(containsDistinct([0, 1, 2, 3, 2, 3])).toBe(false);
  });

  it('should return false if array contains same values with comparison functions', () => {
    const array = [-1, 0, 1];
    const equals = jasmine.createSpy('equals').and.callFake((a, b) => {
      return Math.abs(a) === Math.abs(b);
    });

    expect(containsDistinct(array, equals)).toBe(false);
  });
});
