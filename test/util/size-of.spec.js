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

import {sizeOf} from 'src/core/util/size-of.js';

describe('sizeOf', () => {
  it('should return 0 with nil value', () => {
    expect(sizeOf(null)).toBe(0);
    expect(sizeOf(undefined)).toBe(0);
  });

  it('should return length of array', () => {
    expect(sizeOf([])).toBe(0);
    expect(sizeOf([1, 2, 3])).toBe(3);
  });

  it('should return length of array-like object', () => {
    const arrayLike = {'0': 1, '1': 2, '2': 3, 'length': 3};
    expect(sizeOf(arrayLike)).toBe(3);
  });

  it('should return number of properties of objects', () => {
    const obj = {foo: 'bar', quix: 'bar'};
    expect(sizeOf(obj)).toBe(2);
  });
});
