/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2022 Mickael Jeanroy
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

import {toBeSorted} from '../../../src/core/matchers/arrays/to-be-sorted.js';
import {createFakeContext} from '../../testing/create-fake-context.js';

describe('toBeSorted', () => {
  it('should pass with a sorted array', () => {
    const actual = [0, 1, 2, 3];
    const ctx = createFakeContext(actual);

    const result = toBeSorted(ctx);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect [ 0, 1, 2, 3 ] {{not}} to be sorted`
    );
  });

  it('should pass with a sorted array and a comparator function', () => {
    const actual = [0, -1, 2, -3];
    const ctx = createFakeContext(actual);
    const comparator = jasmine.createSpy('comparator').and.callFake((a, b) => {
      return Math.abs(a) - Math.abs(b);
    });

    const result = toBeSorted(ctx, comparator);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect [ 0, -1, 2, -3 ] {{not}} to be sorted`
    );

    expect(comparator).toHaveBeenCalled();
  });

  it('should fail with a non-sorted array', () => {
    const actual = [0, -1, 2, -3];
    const ctx = createFakeContext(actual);

    const result = toBeSorted(ctx);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect [ 0, -1, 2, -3 ] {{not}} to be sorted`
    );
  });
});
