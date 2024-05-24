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

import { toHaveSameSizeAs } from '../../../src/core/matchers/objects/to-have-same-size-as';
import { createFakeContext } from '../../testing/create-fake-context';

describe('toHaveSameSizeAs', () => {
  it('should check length of array', () => {
    const actual = [1, 2, 3];
    const expected = [4, 5, 6];
    const ctx = createFakeContext(actual);

    const result = toHaveSameSizeAs(ctx, expected);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
      'Expect [ 1, 2, 3 ] {{not}} to have same size as [ 4, 5, 6 ]',
    );
  });

  it('should check size of object', () => {
    const actual = { foo: 'bar' };
    const expected = { bar: 'foo' };
    const ctx = createFakeContext(actual);

    const result = toHaveSameSizeAs(ctx, expected);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
      "Expect Object({ foo: 'bar' }) {{not}} to have same size as Object({ bar: 'foo' })",
    );
  });

  it('should fail with non expected length', () => {
    const actual = { foo: 'bar' };
    const expected = {};
    const ctx = createFakeContext(actual);

    const result = toHaveSameSizeAs(ctx, expected);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
      "Expect Object({ foo: 'bar' }) {{not}} to have same size as Object({  })",
    );
  });
});
