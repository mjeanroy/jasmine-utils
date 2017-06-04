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

import {isSorted} from '../../src/core/util/is-sorted.js';

describe('isSorted', () => {
  it('should return true for an empty array', () => {
    expect(isSorted([])).toBe(true);
  });

  it('should return true for an array of one element', () => {
    expect(isSorted([1])).toBe(true);
  });

  it('should return true for a sorted array', () => {
    expect(isSorted([0, 1, 2, 3])).toBe(true);
  });

  it('should return false for a non-sorted array', () => {
    expect(isSorted([1, 2, 3, 0])).toBe(false);
  });

  it('should return true for a sorted array with a comparison function', () => {
    const comparator = jasmine.createSpy('comparator').and.callFake((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    expect(isSorted(['bar', 'FOO', 'foo'], comparator)).toBe(true);
    expect(comparator).toHaveBeenCalled();
  });
});
