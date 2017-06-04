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

import {contains} from '../../src/core/util/contains.js';

describe('contains', () => {
  it('should returns true if elements is in the array with default equality function', () => {
    const array = [1, 2, 3];

    expect(contains(array, 1)).toBe(true);
    expect(contains(array, 2)).toBe(true);
    expect(contains(array, 3)).toBe(true);
  });

  it('should return true if value is in array with custom equality function', () => {
    const array = ['foo', 'bar'];
    const equalsFn = jasmine.createSpy('equals').and.callFake((a, b) => {
      return a.toLowerCase() === b.toLowerCase();
    });

    expect(contains(array, 'foo', equalsFn)).toBe(true);
    expect(contains(array, 'FOO', equalsFn)).toBe(true);
    expect(contains(array, 'bar', equalsFn)).toBe(true);
    expect(contains(array, 'BAR', equalsFn)).toBe(true);

    expect(equalsFn).toHaveBeenCalled();
  });

  it('should return false if value is not in array', () => {
    const array = [1, 2, 3];

    expect(contains(array, 0)).toBe(false);
    expect(contains(array, 4)).toBe(false);
  });
});
