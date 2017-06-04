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

import {indexOf} from '../../src/core/util/index-of.js';

describe('indexOf', () => {
  it('should find index in array with default equality function', () => {
    const array = [1, 2, 3];

    expect(indexOf(array, 1)).toBe(0);
    expect(indexOf(array, 2)).toBe(1);
    expect(indexOf(array, 3)).toBe(2);
  });

  it('should find index in array with custom equality function', () => {
    const array = ['foo', 'bar'];
    const equalsFn = jasmine.createSpy('equals').and.callFake((a, b) => {
      return a.toLowerCase() === b.toLowerCase();
    });

    expect(indexOf(array, 'foo', equalsFn)).toBe(0);
    expect(indexOf(array, 'FOO', equalsFn)).toBe(0);
    expect(indexOf(array, 'bar', equalsFn)).toBe(1);
    expect(indexOf(array, 'BAR', equalsFn)).toBe(1);

    expect(equalsFn).toHaveBeenCalled();
  });

  it('should return -1 if value is not in array', () => {
    const array = [1, 2, 3];

    expect(indexOf(array, 0)).toBe(-1);
    expect(indexOf(array, 4)).toBe(-1);
  });
});
